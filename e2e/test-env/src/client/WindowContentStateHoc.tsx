import React, { ElementType } from 'react';
import { TABLE_TYPE } from 'wix-rich-content-plugin-table';
import { ACCORDION_TYPE } from 'wix-rich-content-plugin-accordion';
import { DraftContent, RicosEntity, RicosEntityMap } from 'wix-rich-content-common';

type Predicate = (entity: RicosEntity) => boolean;

interface InnerRceFixer {
  predicate: Predicate;
  entityFixer: (entity: RicosEntity) => void;
}

const removeKeyFromBlocks = blocks => blocks.map((block, index) => ({ ...block, key: index }));

const isTable: Predicate = entity => entity.type === TABLE_TYPE;
const isAccordion: Predicate = entity => entity.type === ACCORDION_TYPE;

type Row = Record<string, Columns>;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Columns = Record<string, any>;

const innerRceFixers: InnerRceFixer[] = [
  {
    predicate: isTable,
    entityFixer: entity => {
      const { rows }: { rows: Row[] } = entity.data.config;
      Object.entries(rows).forEach(([, row]) => {
        Object.entries(row.columns).forEach(([, column]) => {
          column.content.blocks = removeKeyFromBlocks(column.content.blocks);
          column.merge?.key && (column.merge.key = '');
          column.merge?.parentCellKey && (column.merge.parentCellKey = '');
        });
      });
    },
  },
  {
    predicate: isAccordion,
    entityFixer: entity => {
      const { pairs } = entity.data;
      pairs.forEach(pair => {
        pair.title.blocks = removeKeyFromBlocks(pair.title.blocks);
        pair.content.blocks = removeKeyFromBlocks(pair.content.blocks);
      });
    },
  },
];

const entityMapInnerRceFixer = (entityMap: RicosEntityMap) => {
  Object.values(entityMap).forEach((entity: RicosEntity) => {
    innerRceFixers.forEach(({ predicate, entityFixer }) => {
      if (predicate(entity)) {
        entityFixer(entity);
      }
    });
  });
  return entityMap;
};

const putContentStateStateOnWindowForTests = contentState => {
  if (typeof window !== 'undefined') {
    window.__CONTENT_STATE__ = contentState;
    window.__CONTENT_SNAPSHOT__ = {
      ...contentState,
      // blocks keys are random so for snapshot diffing they are changed to indexes
      blocks: removeKeyFromBlocks(contentState.blocks),
      entityMap: entityMapInnerRceFixer(contentState.entityMap),
    };
    // eslint-disable-next-line fp/no-delete
    delete window.__CONTENT_SNAPSHOT__.VERSION;
  }
};
export default (WrappedComponent: ElementType) => {
  class WindowContentStateHoc extends React.Component<{ contentState?: DraftContent }> {
    componentDidUpdate(prevProps) {
      const { contentState } = this.props;
      if (prevProps.contentState !== contentState) {
        putContentStateStateOnWindowForTests(contentState);
      }
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  return WindowContentStateHoc;
};

declare global {
  interface Window {
    __CONTENT_STATE__: DraftContent;
    __CONTENT_SNAPSHOT__: DraftContent;
  }
}
