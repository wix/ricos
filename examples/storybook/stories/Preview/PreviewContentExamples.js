import React, { useState } from 'react';
import { Dropdown } from 'wix-style-react';

import { RichContentViewerBox, Section, Page } from '../Components/StoryParts';

import { previewSettings } from 'wix-rich-content-preview';
import ViewerWrapper from '../Components/ViewerWrapper';
import * as fixtures from './fixtures';

const options = [
  'Small content',
  'Small content + style',
  'ReadMore (lines > 3)',
  'ReadMore + 1x Image',
  'ReadMore + 2x Image',
  'ReadMore + 5x Image',
  'ReadMore + 5x Image + Text in-between',
  'ReadMore + 1x Gif + 5x Image',
  'ReadMore + 1x Vid + 1x Gif + 5x Image',
  'ReadMore + 2x Vid + 1x Gif + 5x Image',
  'Text Fragmentation Example',
].map((value, index) => ({ id: index + 1, value }));

export default () => {
  const initialId = 9;
  const [content, setContent] = useState(fixtures['example' + initialId]);
  const [ruleIdx, chooseRule] = useState(false);
  const onSelect = ({ id }) => {
    chooseRule(id);
    setContent(fixtures['example' + id]);
  };
  return (
    <Page title="Preview Examples">
      <Dropdown
        placeholder="default, choose to change"
        initialSelectedId={initialId}
        itemHeight="small"
        maxHeightPixels="5x"
        onSelect={onSelect}
        options={options}
      />
      <Section type={Section.Types.COMPARISON}>
        <Section title="Viewer">
          <RichContentViewerBox>
            <ViewerWrapper key={ruleIdx + 1} content={content} />
          </RichContentViewerBox>
        </Section>

        <Section title="Preview">
          <RichContentViewerBox>
            <ViewerWrapper key={ruleIdx + 1} content={content} preview={previewSettings()} />
          </RichContentViewerBox>
        </Section>
      </Section>
    </Page>
  );
};
