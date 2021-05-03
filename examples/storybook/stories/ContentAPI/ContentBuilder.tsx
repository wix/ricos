import React, { useEffect, useMemo, useState } from 'react';
import { Layout, Cell } from 'wix-style-react';
import { Page } from '../Components/StoryParts';
import theme from '../../../main/shared/theme/theme';
import EditorWrapper from '../Components/EditorWrapper';
import { setupContentBuilder } from 'ricos-content/libs/Content';
import { fromDraft, toDraft } from 'ricos-content/libs/migrateSchema';
import { emptyState } from 'ricos-common';
import { Paragraph } from './Panels';
import { Sidebar } from './Sidebar';
import { AddFunctor } from './types';

export default () => {
  const app = useMemo(() => setupContentBuilder(() => 'foo'), []);
  const [content, setContent] = useState(emptyState);
  const addFunc: AddFunctor = useMemo(
    () => (element, args) => {
      const currentContent = fromDraft(content);
      const newContent = app[element]({ ...(args as any), content: currentContent });
      setContent(toDraft(newContent));
    },
    [app, content]
  );
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
            <Paragraph addFunc={args => addFunc('addParagraph', args)} />
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
