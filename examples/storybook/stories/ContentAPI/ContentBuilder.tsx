import React, { useState, useEffect, FC } from 'react';
import { Layout, ComposerSidebar, Cell } from 'wix-style-react';
import * as Icons from 'wix-ui-icons-common';
import { emptyState } from 'ricos-common';
import { Page } from '../Components/StoryParts';
import theme from '../../../main/shared/theme/theme';
import EditorWrapper from '../Components/EditorWrapper';

const Sidebar: FC = () => {
  const items = [
    {
      id: 0,
      label: 'Text',
      icon: <Icons.SentenceCase />,
    },
    {
      id: 1,
      label: 'Image',
      icon: <Icons.Image />,
    },
    {
      id: 2,
      label: 'Gallery',
      icon: <Icons.LayoutGallery />,
    },
  ];

  return <ComposerSidebar labelPlacement="end" items={items} />;
};

export default () => {
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
        <Layout alignItems="top">
          <Cell span={2}>
            <Sidebar />
          </Cell>
          <Cell span={3}>Edit Panel</Cell>
          <Cell span={6}>
            <EditorWrapper theme={theme} />
          </Cell>
        </Layout>
      </Page>
    </>
  );
};
