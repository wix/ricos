import React from 'react';
import { RichContentEditorBox, Section, Page } from '../../Components/StoryParts';
import { pluginHeadings } from 'wix-rich-content-plugin-headings';
import headingsContentState from '../../../../../e2e/tests/fixtures/headings.json';
import HeadingsEditor from './HeadingsEditor';
import editorSourcecode from '!!raw-loader!./HeadingsEditor.js';

export default () => {
  return (
    <Page title="Headings Plugin">
      <Section type={Section.Types.COMPARISON}>
        <RichContentEditorBox
          title="With Headings Menu"
          sourcecode={editorSourcecode}
          content={headingsContentState}
        >
          <HeadingsEditor content={headingsContentState} pluginHeadings={pluginHeadings} />
        </RichContentEditorBox>
        <RichContentEditorBox title="With Headings Button">
          <HeadingsEditor content={headingsContentState} />
        </RichContentEditorBox>
      </Section>
    </Page>
  );
};
