import React, { useMemo, useState } from 'react';
import { Layout, Cell } from 'wix-style-react';
import { Page } from '../Components/StoryParts';
import theme from '../../../main/shared/theme/theme';
import { setupContentBuilder } from 'ricos-content/libs/Content';
import { fromDraft, toDraft } from 'ricos-content/libs/migrateSchema';
import { emptyState } from 'ricos-common';
import { Paragraph } from './Panels';
import { Sidebar } from './Sidebar';
import { AddFunctor } from './types';
import { newKey } from './blockKeyGenerator';
import ViewerWrapper from '../Components/ViewerWrapper';

const app = setupContentBuilder(() => newKey(5));

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
            <Paragraph addFunc={addFunc} />
          </Cell>
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