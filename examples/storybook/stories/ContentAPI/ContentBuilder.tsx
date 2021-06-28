import React, { useMemo, useState } from 'react';
import { Layout, Cell } from 'wix-style-react';
import { Page } from '../Components/StoryParts';
import { setupContentBuilder } from 'ricos-content/libs/Content';
import { fromDraft, toDraft } from 'ricos-content/libs/migrateSchema';
import { emptyState } from 'ricos-common';
import {
  Paragraph,
  Image,
  Video,
  File,
  Divider,
  Button,
  Gallery,
  Html,
  Heading,
  Code,
} from './PluginPanels';
import { Sidebar } from './Sidebar';
import { AddMethod, EditPanelProps, Plugins } from './types';
import { newKey } from './blockKeyGenerator';
import ViewerWrapper from '../Components/ViewerWrapper';
import theme from '../../../main/shared/theme/theme';
import styles from './ContentBuilder.scss';
import * as Icons from 'wix-ui-icons-common';

const app = setupContentBuilder(() => newKey(5));

const plugins: Plugins = [
  ['Button', Icons.SquareRatio, Button],
  ['Code', Icons.Code, Code],
  ['Divider', Icons.Divider, Divider],
  ['File', Icons.Attachment, File],
  ['Gallery', Icons.LayoutGallery, Gallery],
  ['Heading', Icons.Rename, Heading],
  ['Html', Icons.Code, Html],
  ['Image', Icons.Image, Image],
  ['Paragraph', Icons.SentenceCase, Paragraph],
  ['Video', Icons.VideoCamera, Video],
];

export default () => {
  const [content, setContent] = useState(emptyState);
  const [selectedPanel, setSelectedPanel] = useState(0);
  const addFunc: AddMethod = useMemo(
    () => (element, args) => {
      const currentContent = fromDraft(content);
      const newContent = app[element]({ ...(args as any), content: currentContent });
      const contentAsDraft = toDraft(newContent);
      setContent(contentAsDraft);
    },
    [content]
  );
  const createPanels = useMemo(
    () => (props: EditPanelProps<any>) =>
      plugins.map(([, , Component]) => Component && <Component {...props} />),
    [content]
  );
  const panels = createPanels({ addFunc });
  return (
    <Page title="Content Builder">
      <Layout cols={6} alignItems="top" justifyItems="stretch">
        <Cell span={1}>
          <Sidebar plugins={plugins} setPanel={setSelectedPanel} />
        </Cell>
        <Cell span={2}>{selectedPanel >= 0 && panels[selectedPanel]}</Cell>
        <Cell span={3}>
          <div className={styles.viewer}>
            <ViewerWrapper theme={theme} content={content} />
          </div>
        </Cell>
      </Layout>
    </Page>
  );
};
