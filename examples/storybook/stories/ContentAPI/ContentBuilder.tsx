import React, { FC, useEffect, useMemo, useState } from 'react';
import {
  Layout,
  ComposerSidebar,
  Cell,
  ComposerSidebarItem,
  FormField,
  InputWithLabel,
  Button,
} from 'wix-style-react';
import * as Icons from 'wix-ui-icons-common';
import { Page } from '../Components/StoryParts';
import theme from '../../../main/shared/theme/theme';
import EditorWrapper from '../Components/EditorWrapper';
import { setupContentBuilder } from 'ricos-content/libs/Content';
import { fromDraft, toDraft } from 'ricos-content/libs/migrateSchema';
import { emptyState } from 'ricos-common';
import styles from './ContentBuilder.scss';

const Sidebar: FC = () => {
  const [selected, setSelected] = useState(0);
  const onSelect = (id: number) => setSelected(selected !== id ? id : -1);
  const plugins = [
    ['Text', Icons.SentenceCase],
    ['Image', Icons.Image],
    ['Video', Icons.VideoCamera],
    ['File', Icons.Attachment],
    ['Divider', Icons.Divider],
    ['Button', Icons.SquareRatio],
    ['Gallery', Icons.LayoutGallery],
    ['Html', Icons.Code],
  ].map(([label, Icon], id) => ({
    id,
    label,
    icon: <Icon />,
    onClick: () => onSelect(id),
  })) as ComposerSidebarItem[];

  return (
    <ComposerSidebar
      className={styles.composer}
      size="large"
      labelPlacement="end"
      items={plugins}
      selectedId={selected}
    />
  );
};

const EditPanel: FC<EditTextProps> = ({ onAdd }) => {
  const [text, setText] = useState(undefined as string);
  const [alignment, setAlignment] = useState(undefined as string);
  return (
    <Layout>
      <Cell>
        <InputWithLabel label="Text" value={text} onChange={e => setText(e.currentTarget.value)} />
      </Cell>
      <Cell>
        <InputWithLabel
          label="Alignment"
          value={alignment}
          onChange={e => setAlignment(e.currentTarget.value)}
        />
      </Cell>
      <Cell>
        <Button onClick={() => onAdd({ text, alignment })}>Add</Button>
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
        <Layout cols={6} alignItems="top" justifyItems="stretch">
          <Cell span={1}>
            <Sidebar />
          </Cell>
          <Cell span={2}>
            <EditPanel onAdd={({ text, alignment }) => {}} />
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
