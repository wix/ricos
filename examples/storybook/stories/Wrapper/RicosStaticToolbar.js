import React, { useEffect } from 'react';
import { RicosEditor } from 'ricos-editor';
import { RichContentEditorBox, Section, Page } from '../Components/StoryParts';
import { pluginDivider } from 'wix-rich-content-plugin-divider';
import MobileDetect from 'mobile-detect';

import inlineStylesState from '../../../../e2e/tests/fixtures/inline-styles.json';

const mobileDetect = new MobileDetect(window.navigator.userAgent);
const plugins = [pluginDivider()];

export default () => {
  const bottomToolbar = document.createElement('div');
  const isMobile = mobileDetect.mobile() !== null;

  useEffect(() => {
    const wrappingDiv = document.getElementById('editor-static-toolbar-wrapper');
    wrappingDiv.appendChild(bottomToolbar);
  }, []);

  return (
    <Page title="Ricos with static text toolbar">
      <h3>Default static toolbar </h3>
      <Section type={Section.Types.COMPARISON}>
        <RichContentEditorBox>
          <RicosEditor
            content={inlineStylesState}
            toolbarSettings={{ useStaticTextToolbar: true }}
            isMobile={isMobile}
            plugins={plugins}
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
              isMobile={isMobile}
              plugins={plugins}
            />
          </div>
        </RichContentEditorBox>
      </Section>
    </Page>
  );
};
