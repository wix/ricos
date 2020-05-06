import React from 'react';

import { RicosViewer } from 'wix-rich-content-wrapper/dist/es/viewer';
import {
  RichContentEditorBox,
  RichContentViewerBox,
  Section,
  Page,
} from '../Components/StoryParts';

import { pluginDivider } from 'wix-rich-content-plugin-divider/dist/module.viewer';

import dividerContentState from '../../../../e2e/tests/fixtures/divider.json';
import DividerEditor from './WrapperBasicUsage';
import sourcecode from '!!raw-loader!./WrapperBasicUsage.js';

export default () => {
  return (
    <Page title="Wrapper Basic Usage">
      <Section type={Section.Types.COMPARISON}>
        <RichContentEditorBox sourcecode={sourcecode} contentState={dividerContentState}>
          <DividerEditor contentState={dividerContentState} />
        </RichContentEditorBox>
        <RichContentViewerBox>
          <RicosViewer contentState={dividerContentState} plugins={[pluginDivider()]} />
        </RichContentViewerBox>
      </Section>
    </Page>
  );
};
