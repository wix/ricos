import React, { useState, useEffect } from 'react';
import { RicosEditor } from 'ricos-editor';
import { RichContentEditorBox, Section, Page } from '../Components/StoryParts';

import inlineStylesState from '../../../../e2e/tests/fixtures/inline-styles.json';

export default () => {
  const bottomToolbar = document.createElement('div');

  useEffect(() => {
    const wrappingDiv = document.getElementById('editor-static-toolbar-wrapper');
    wrappingDiv.appendChild(bottomToolbar);
  }, []);

  return (
    <Page title="Wrapper with static text toolbar">
      <h3>Default static toolbar </h3>
      <Section type={Section.Types.COMPARISON}>
        <RichContentEditorBox>
          <RicosEditor
            content={inlineStylesState}
            toolbarSettings={{ useStaticTextToolbar: true }}
          />
        </RichContentEditorBox>
      </Section>
      <h3>Static toolbar in a toolbar container</h3>
      <Section type={Section.Types.COMPARISON}>
        <RichContentEditorBox>
          <div id="editor-static-toolbar-wrapper">
            <RicosEditor
              content={inlineStylesState}
              toolbarSettings={{ textToolbarContainer: bottomToolbar }}
            />
          </div>
        </RichContentEditorBox>
      </Section>
    </Page>
  );
};
