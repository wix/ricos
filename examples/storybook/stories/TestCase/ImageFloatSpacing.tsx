import React from 'react';
import { RichContentEditor } from 'wix-rich-content-editor';
import { RicosEditor } from 'ricos-editor';
import { RicosViewer } from 'ricos-viewer';
import { pluginImage as pluginImageEditor } from 'wix-rich-content-plugin-image';
import { pluginImage as pluginImageViewer } from 'wix-rich-content-plugin-image/viewer';
import imageFloatWithSpace from '../../../../e2e/tests/fixtures/image-float-with-spacing.json';
import {
  RichContentEditorBox,
  RichContentViewerBox,
  ContentState,
  Section,
  Page,
} from '../Components/StoryParts';

const editorPlugins = [pluginImageEditor()];
const helpers = {
  onFilesChange: (files, updateEntity) => console.log('on file change', { files, updateEntity }), //eslint-disable-line
};

const viewerPlugins = [pluginImageViewer()];

export default () => {
  return (
    <Page title="Weird Spacing Bug">
      <Section type={Section.Types.COMPARISON}>
        <RichContentEditorBox preset="blog-preset">
          <RicosEditor plugins={editorPlugins} content={imageFloatWithSpace}>
            <RichContentEditor helpers={helpers} />
          </RicosEditor>
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
