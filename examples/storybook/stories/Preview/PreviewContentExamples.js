import React, { useState } from 'react';
import { Dropdown } from 'wix-style-react';

import { RichContentViewerBox, Section, Page } from '../Components/StoryParts';

import { previewSettings } from 'wix-rich-content-preview';
import ViewerWrapper from '../Components/ViewerWrapper';
import fixturesNames, { fixtures } from '../../../../e2e/tests/fixtures/preview';

const options = fixturesNames.map((value, index) => ({ id: index + 1, value }));

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
