import React, { useState } from 'react';
import { Dropdown, Input } from 'wix-style-react';
import { truncateContentState } from 'wix-rich-content-common/libs/contentStateServices';
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
            <ViewerWrapper
              key={ruleIdx + 1}
              content={
                collapsed
                  ? truncateContentState(content, blocksCount, { wordsCount, maxPlugins })
                  : content
              }
            />
          </RichContentViewerBox>
          <div onClick={() => setCollapse(!collapsed)}>View {collapsed ? 'More' : 'Less'} </div>
        </Section>
      </Section>
    </Page>
  );
};
