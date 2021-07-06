/* eslint-disable jsx-a11y/label-has-associated-control, jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';
import { Dropdown, Input } from 'wix-style-react';
import { truncateContent } from 'ricos-content/libs/truncateContent';
import { RichContentViewerBox, Section, Page } from '../Components/StoryParts';

import ViewerWrapper from '../Components/ViewerWrapper';
import EditorWrapper from '../Components/EditorWrapper';
import fixturesNames, { fixtures } from '../../../../e2e/tests/fixtures/preview';

const options = fixturesNames.map((value, index) => ({ id: index + 1, value }));

export default () => {
  const initialId = 9;
  const [content, setContent] = useState(fixtures['example' + initialId]);
  const [blocksCount, setBlocksCount] = useState(3);
  const [wordsCount, setWordsCount] = useState(120);
  const [collapsed, setCollapse] = useState(true);
  const [maxPlugins, setMaxPlugins] = useState(1);
  const [ruleIdx, chooseRule] = useState(0);
  const onSelect = ({ id }) => {
    chooseRule(id);
    setContent(fixtures['example' + id]);
  };

  const { content: truncatedConted, isTruncated } = truncateContent(content, {
    wordsCount,
    maxPlugins,
    blocksCount,
  });
  return (
    <Page title="Preview Examples">
      <label>Content Type</label>
      <Dropdown
        placeholder="default, choose to change"
        initialSelectedId={initialId}
        itemHeight="small"
        maxHeightPixels="5x"
        onSelect={onSelect}
        options={options}
      />
      <label>Blocks Count</label>
      <Input
        size="large"
        value={blocksCount}
        onChange={({ target: { value } }) => setBlocksCount(Number(value))}
      />
      <label>Words Count</label>
      <Input
        size="large"
        value={wordsCount}
        onChange={({ target: { value } }) => setWordsCount(Number(value))}
      />
      <label>Max Plugins</label>
      <Input
        size="large"
        value={maxPlugins}
        onChange={({ target: { value } }) => setMaxPlugins(Number(value))}
      />

      <Section type={Section.Types.COMPARISON}>
        <Section title="Viewer">
          <RichContentViewerBox>
            <EditorWrapper key={ruleIdx + 1} content={content} onChange={setContent} />
          </RichContentViewerBox>
        </Section>

        <Section title="Preview">
          <RichContentViewerBox>
            <ViewerWrapper key={ruleIdx + 1} content={collapsed ? truncatedConted : content} />
          </RichContentViewerBox>
          {isTruncated && (
            <div onClick={() => setCollapse(!collapsed)}>See {collapsed ? 'More' : 'Less'} </div>
          )}
        </Section>
      </Section>
    </Page>
  );
};
