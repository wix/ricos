import React from 'react';
import fixtrue from '../../../../../e2e/tests/fixtures/linkPreview.json';
import LinkPreviewEditor from './LinkPreviewEditor';
import LinkPreviewViewer from './LinkPreviewViewer';
import editorSourcecode from '!!raw-loader!./LinkPreviewEditor.js';
import viewerSourcecode from '!!raw-loader!./LinkPreviewViewer.js';
import { Table } from 'wix-style-react';

import {
  RichContentEditorBox,
  RichContentViewerBox,
  ContentState,
  Section,
  Page,
} from '../../Components/StoryParts';

export default () => {
  const data = [
    {
      name: 'enableEmbed',
      type: 'one of boolean, array',
      defaultValue: 'true',
      required: '',
      description:
        'Allows to display provider embed if exist (can be true/false/[Twitter, YouTube,..]',
    },
    {
      name: 'enableLinkPreview',
      type: 'boolean',
      defaultValue: 'true',
      required: '',
      description: 'Allows to display link preview if exist',
    },
    {
      name: 'fetchData',
      type: 'function',
      defaultValue: '',
      required: 'required',
      description:
        'A func that gets url and returns an object with title, image_url, description (optional) that related to the given url',
    },
    {
      name: 'exposeEmbedButtons',
      type: 'array',
      defaultValue: '[]',
      required: '',
      description:
        'Which embed buttons will display - array with LinkPreviewProvider types [Instagram, Twitter, ...] ',
    },
  ];
  return (
    <Page title="Link Preview">
      <Section type={Section.Types.COMPARISON}>
        <RichContentEditorBox
          sourcecode={editorSourcecode}
          contentState={fixtrue}
          preset="blog-preset"
        >
          <LinkPreviewEditor contentState={fixtrue} />
        </RichContentEditorBox>
        <RichContentViewerBox preset="blog-preset" sourcecode={viewerSourcecode}>
          <LinkPreviewViewer contentState={fixtrue} />
        </RichContentViewerBox>
      </Section>
      <Section title="Api">
        <h3>Props:</h3>
        <Table
          data={data}
          columns={[
            { title: 'Name', render: row => row.name },
            { title: 'Type', render: row => row.type },
            { title: 'Default Value', render: row => row.defaultValue },
            { title: 'Required', render: row => row.required },
            { title: 'Description', render: row => row.description },
          ]}
        >
          <Table.Content />
        </Table>
      </Section>
      <Section title="Content State">
        <ContentState json={fixtrue} />
      </Section>
    </Page>
  );
};
