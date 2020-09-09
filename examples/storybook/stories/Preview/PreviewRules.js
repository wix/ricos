import React, { useState } from 'react';
import { Dropdown } from 'wix-style-react';

import {
  RichContentViewerBox,
  RichContentEditorBox,
  Section,
  Page,
} from '../Components/StoryParts';

import { ContentStateTransformation, previewSettings } from 'wix-rich-content-preview';
import EditorWrapper from '../Components/EditorWrapper';
import ViewerWrapper from '../Components/ViewerWrapper';

import introState from '../../../../e2e/tests/fixtures/very-big-post.json';

export default () => {
  const [content, setContent] = useState(introState);
  const [ruleIdx, chooseRule] = useState(0);

  const transformations = [
    new ContentStateTransformation({
      _if: metadata => metadata.groupedBlocks.plain.length > 0,
      _then: (metadata, preview) =>
        preview.plain(metadata.groupedBlocks.plain[0]).readMore({ lines: 3 }),
    }),
    new ContentStateTransformation({
      _if: metadata => metadata.images.length > 0,
      _then: (metadata, preview) => preview.image({ mediaInfo: metadata.images[0] }).seeFullPost(),
    }),
    new ContentStateTransformation({
      _if: metadata => metadata.groupedBlocks.plain.length > 0,
      _then: (metadata, preview) =>
        preview.plain(metadata.groupedBlocks.plain[0]).readMore({ lines: 1 }),
    }).rule({
      _if: metadata => metadata.media.galleryItems.length > 3,
      _then: (metadata, preview) =>
        preview
          .gallery({ mediaInfo: metadata.media.galleryItems.slice(0, 3) })
          .imageCounter({ counter: metadata.media.galleryItems.length - 3 }),
    }),
  ];
  const transformation = ruleIdx && transformations[ruleIdx - 1];
  return (
    <Page title="Preview Rules">
      <Dropdown
        selectedId={ruleIdx}
        onSelect={({ id }) => chooseRule(id)}
        options={[
          { id: 0, value: 'Default Rules' },
          { id: 1, value: 'Text only, without expand' },
          { id: 2, value: 'One image only, with See Full Post' },
          { id: 3, value: 'Text and image, exapnd on click' },
        ]}
      />
      <Section type={Section.Types.COMPARISON}>
        <RichContentEditorBox>
          <EditorWrapper content={content} onChange={setContent} />
        </RichContentEditorBox>

        <RichContentViewerBox>
          <ViewerWrapper
            key={ruleIdx + 1}
            content={content}
            preview={previewSettings(transformation && { transformation })}
          />
        </RichContentViewerBox>
      </Section>
    </Page>
  );
};
