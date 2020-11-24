import React from 'react';
import PropTypes from 'prop-types';
import { TABLE_TYPE } from 'wix-rich-content-plugin-table';

const removeKeyFromBlocks = blocks => blocks.map((block, index) => ({ ...block, key: index }));

const isTable = entity => entity.type === TABLE_TYPE;

const innerRceFixers = [
  {
    predicate: isTable,
    entityFixer: entity => {
      const { rows } = entity.data.config;
      Object.entries(rows).forEach(([, row]) => {
        Object.entries(row.columns).forEach(([, column]) => {
          column.content.blocks = removeKeyFromBlocks(column.content.blocks);
          column.merge?.key && (column.merge.key = '');
          column.merge?.parentCellKey && (column.merge.parentCellKey = '');
        });
      });
    },
  },
];

const entityMapInnerRceFixer = entityMap => {
  Object.values(entityMap).forEach(entity => {
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
export default WrappedComponent => {
  class WindowContentStateHoc extends React.Component {
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

  WindowContentStateHoc.propTypes = {
    contentState: PropTypes.object,
  };

  return WindowContentStateHoc;
};
