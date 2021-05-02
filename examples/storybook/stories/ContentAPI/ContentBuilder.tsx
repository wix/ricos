import React, { FC, useEffect, useMemo, useState } from 'react';
import {
  Layout,
  ComposerSidebar,
  Cell,
  ComposerSidebarItem,
  FormField,
  Input,
  Button,
} from 'wix-style-react';
import * as Icons from 'wix-ui-icons-common';
import { Page } from '../Components/StoryParts';
import theme from '../../../main/shared/theme/theme';
import EditorWrapper from '../Components/EditorWrapper';
import { setupContentBuilder } from 'ricos-content/libs/Content';
import { fromDraft, toDraft } from 'ricos-content/libs/migrateSchema';
import { emptyState } from 'ricos-common';

const Sidebar: FC = () => {
  const [selected, setSelected] = useState(0);
  const onSelect = (id: number) => setSelected(selected !== id ? id : -1);
  const plugins = [
    ['Text', Icons.SentenceCase],
    ['Image', Icons.Image],
    ['Gallery', Icons.LayoutGallery],
  ].map(([label, Icon], id) => ({
    id,
    label,
    icon: <Icon />,
    onClick: () => onSelect(id),
  })) as ComposerSidebarItem[];

  return (
    <ComposerSidebar size="large" labelPlacement="end" items={plugins} selectedId={selected} />
  );
};

const EditPanel: FC = () => {
  const [alignment, setAlignment] = useState(undefined as string);
  return (
    <Layout>
      <Cell>
        <FormField label="Text">
          <Input />
        </FormField>
      </Cell>
      <Cell>
        <FormField label="Alignment">
          <Input />
        </FormField>
      </Cell>
      <Cell>
        <Button>Add</Button>
      </Cell>
    </Layout>
  );
};

export default () => {
  const app = useMemo(() => setupContentBuilder(() => 'foo'), []);
  const [content, setContent] = useState(emptyState);
  useEffect(() => {
    const currentContent = fromDraft(content);
    const newContent = app.addParagraph({
      text: 'Blabla',
      content: currentContent,
      data: { textStyle: { textAlignment: undefined } },
    });
    setContent(toDraft(newContent));
  }, []);
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
        <Layout cols={6} gap={0} alignItems="top">
          <Cell span={1}>
            <Sidebar />
          </Cell>
          <Cell span={2}>
            <EditPanel />
          </Cell>
          <Cell span={3}>
            <div style={{ paddingInlineStart: '60px' }}>
              <EditorWrapper theme={theme} content={content} />
            </div>
          </Cell>
        </Layout>
      </Page>
    </>
  );
};
