import React, { useState, useEffect } from 'react';
import { RicosEditor } from 'ricos-editor';
import { RichContentEditorBox, Section, Page } from '../Components/StoryParts';

import inlineStylesState from '../../../../e2e/tests/fixtures/inline-styles.json';

export default () => {
  const [bottomToolbar, setBottomToolbar] = useState();

  useEffect(() => {
    setBottomToolbar(document.getElementById('bottom-toolbar'));
  });

  return (
    <Page title="Wrapper with static text toolbar">
      <h3>Default static toolbar </h3>
      <Section type={Section.Types.COMPARISON}>
        <RichContentEditorBox>
          <RicosEditor content={inlineStylesState} textToolbarType="static" />
        </RichContentEditorBox>
      </Section>
      <h3>Static toolbar in a toolbar container</h3>
      <Section type={Section.Types.COMPARISON}>
        <RichContentEditorBox>
          <RicosEditor
            content={inlineStylesState}
            textToolbarType="static"
            textToolbarContainer={bottomToolbar}
          />
          <div id="bottom-toolbar" />
        </RichContentEditorBox>
      </Section>
    </Page>
  );
};
