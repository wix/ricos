import React from 'react';
import { RichContentEditor } from 'wix-rich-content-editor';
import { RicosEditor } from 'ricos-editor';
import { RicosViewer } from 'ricos-viewer';
import { pluginImage as pluginImageEditor } from 'wix-rich-content-plugin-image';
import { pluginImage as pluginImageViewer } from 'wix-rich-content-plugin-image/dist/module.viewer';
import imageFloatWithSpace from '../../../../e2e/tests/fixtures/image-float-with-spacing.json';
import {
  RichContentEditorBox,
  RichContentViewerBox,
  ContentState,
  Section,
  Page,
} from '../Components/StoryParts';

const editorPlugins = [
  pluginImageEditor({
    handleFileUpload: (files, updateEntity) =>
      // eslint-disable-next-line no-console
      console.log('on file change', { files, updateEntity }),
  }),
];

const viewerPlugins = [pluginImageViewer()];

export default () => {
  return (
    <Page title="Weird Spacing Bug">
      <Section type={Section.Types.COMPARISON}>
        <RichContentEditorBox preset="blog-preset">
          <RicosEditor plugins={editorPlugins} content={imageFloatWithSpace} />
        </RichContentEditorBox>
        <RichContentViewerBox preset="blog-preset">
          <RicosViewer content={imageFloatWithSpace} plugins={viewerPlugins} />
        </RichContentViewerBox>
      </Section>

      <Section title="Content State">
        <ContentState json={imageFloatWithSpace} />
      </Section>
    </Page>
  );
};
