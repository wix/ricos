import React, { FC, useMemo, useState } from 'react';
import { Layout, Cell } from 'wix-style-react';
import { Page } from '../Components/StoryParts';
import theme from '../../../main/shared/theme/theme';
import { setupContentBuilder } from 'ricos-content/libs/Content';
import { fromDraft, toDraft } from 'ricos-content/libs/migrateSchema';
import { emptyState } from 'ricos-common';
import { Paragraph } from './Panels';
import { Sidebar } from './Sidebar';
import { AddFunctor, EditPanelProps } from './types';
import { newKey } from './blockKeyGenerator';
import ViewerWrapper from '../Components/ViewerWrapper';
import * as Icons from 'wix-ui-icons-common';

const app = setupContentBuilder(() => newKey(5));

type Plugins = [string, FC<any>, FC<EditPanelProps<any>>?][];

const plugins: Plugins = [
  ['Text', Icons.SentenceCase, Paragraph],
  ['Image', Icons.Image],
  ['Video', Icons.VideoCamera],
  ['File', Icons.Attachment],
  ['Divider', Icons.Divider],
  ['Button', Icons.SquareRatio],
  ['Gallery', Icons.LayoutGallery],
  ['Html', Icons.Code],
];

const createPanels = (addFunc: AddFunctor) =>
  plugins.map(([label, Icon, Component]) => Component && <Component addFunc={addFunc} />);

export default () => {
  const [content, setContent] = useState(emptyState);
  const addFunc: AddFunctor = useMemo(
    () => (element, args) => {
      const currentContent = fromDraft(content);
      const newContent = app[element]({ ...(args as any), content: currentContent });
      const contentAsDraft = toDraft(newContent);
      setContent(contentAsDraft);
    },
    [content]
  );
  const panels = useMemo(() => createPanels(addFunc), [createPanels]);
  const [panel, setPanel] = useState(panels[0]);
  return (
    <>
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Yellowtail&display=swap"
        rel="stylesheet"
      />

      <Page title="Content Builder">
        See Usage{' '}
        <a target="_blank" rel="noreferrer" href="https://wix.github.io/ricos/docs/ricos/theming">
          here
        </a>
        <Layout cols={6} alignItems="top" justifyItems="stretch">
          <Cell span={1}>
            <Sidebar
              plugins={plugins}
              setPanel={id => (id >= 0 ? setPanel(panels[id]) : undefined)}
            />
          </Cell>
          <Cell span={2}>{panel}</Cell>
          <Cell span={3}>
            <div style={{ paddingInlineStart: '60px' }}>
              <ViewerWrapper theme={theme} content={content} />
            </div>
          </Cell>
        </Layout>
      </Page>
    </>
  );
};
