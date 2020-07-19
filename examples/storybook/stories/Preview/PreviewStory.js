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
  const transformation = ruleIdx !== false && transformations[ruleIdx];
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
