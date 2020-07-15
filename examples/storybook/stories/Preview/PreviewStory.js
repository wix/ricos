import React, { useState } from 'react';
import { Dropdown } from 'wix-style-react';

import {
  RichContentViewerBox,
  RichContentEditorBox,
  Section,
  Page,
} from '../Components/StoryParts';
import { convertToRaw } from 'wix-rich-content-editor';

import { ContentStateTransformation, RichContentPreview } from 'wix-rich-content-preview';
import EditorWrapper from '../Components/EditorWrapper';
import { debounce } from 'lodash';
import * as Plugins from '../../../main/shared/preview/PreviewPlugins.jsx';

import { videoTypeMapper } from 'wix-rich-content-plugin-video/dist/module.viewer';
import { dividerTypeMapper } from 'wix-rich-content-plugin-divider/dist/module.viewer';
import { htmlTypeMapper } from 'wix-rich-content-plugin-html/dist/module.viewer';
import { soundCloudTypeMapper } from 'wix-rich-content-plugin-sound-cloud/dist/module.viewer';
import { linkTypeMapper } from 'wix-rich-content-plugin-link/dist/module.viewer';
import { linkPreviewTypeMapper } from 'wix-rich-content-plugin-link-preview/dist/module.viewer';
import { imageTypeMapper } from 'wix-rich-content-plugin-image/dist/module.viewer';
import { galleryTypeMapper } from 'wix-rich-content-plugin-gallery/dist/module.viewer';
import { mapTypeMapper } from 'wix-rich-content-plugin-map/dist/module.viewer';
import { giphyTypeMapper } from 'wix-rich-content-plugin-giphy/dist/module.viewer';
import { buttonTypeMapper } from 'wix-rich-content-plugin-button/dist/module.viewer';
import { mentionsTypeMapper } from 'wix-rich-content-plugin-mentions/dist/module.viewer';
import { fileUploadTypeMapper } from 'wix-rich-content-plugin-file-upload/dist/module.viewer';

import introState from '../../../../e2e/tests/fixtures/very-big-post.json';

export const typeMappers = [
  videoTypeMapper,
  buttonTypeMapper,
  dividerTypeMapper,
  htmlTypeMapper,
  linkTypeMapper,
  linkPreviewTypeMapper,
  soundCloudTypeMapper,
  mentionsTypeMapper,
  imageTypeMapper,
  galleryTypeMapper,
  mapTypeMapper,
  fileUploadTypeMapper,
  giphyTypeMapper,
];

export default () => {
  const [content, setContent] = useState(introState);
  const [ruleIdx, chooseRule] = useState(false);

  const transformations = [
    new ContentStateTransformation({
      _if: metadata => metadata.plain.length > 0,
      _then: (metadata, preview) => preview.plain(metadata.plain[0]).readMore({ lines: 3 }),
    }),
    new ContentStateTransformation({
      _if: metadata => metadata.images.length > 0,
      _then: (metadata, preview) => preview.image({ mediaInfo: metadata.images[0] }).seeFullPost(),
    }),
    new ContentStateTransformation({
      _if: metadata => metadata.plain.length > 0,
      _then: (metadata, preview) => preview.plain(metadata.plain[0]).readMore({ lines: 1 }),
    }).rule({
      _if: metadata => metadata.images.length > 3,
      _then: (metadata, preview) =>
        preview
          .gallery({ mediaInfo: metadata.images.slice(0, 3) })
          .imageCounter({ counter: metadata.images.length - 3 }),
    }),
  ];

  const transformationProps = {};
  if (ruleIdx !== false) {
    transformationProps.transformation = transformations[ruleIdx];
  }
  return (
    <Page title="Preview Rules">
      <Dropdown
        placeholder="default, choose to change"
        onSelect={({ id }) => chooseRule(id)}
        options={[
          { id: 0, value: 'Text only, without expand' },
          { id: 1, value: 'One image only, with See Full Post' },
          { id: 2, value: 'Text and image, exapnd on click' },
        ]}
      />
      <Section type={Section.Types.COMPARISON}>
        <RichContentEditorBox>
          <EditorWrapper content={content} onChange={setContent} />
        </RichContentEditorBox>

        <RichContentViewerBox>
          <RichContentPreview
            //   locale={this.props.locale}
            key={Date.now()}
            helpers={{}}
            {...transformationProps}
            typeMappers={Plugins.typeMappers}
            inlineStyleMappers={Plugins.getInlineStyleMappers(content)}
            decorators={Plugins.decorators}
            config={Plugins.config}
            initialState={content}
          />
        </RichContentViewerBox>
      </Section>
    </Page>
  );
};
