import React, { Component } from 'react';
import { Page, Section, RichContentViewerBox } from '../../Components/StoryParts';
import content from '../../../../../e2e/tests/fixtures/content.json';
import TextSelectionViewer from './TextSelectionViewer';
import viewerSourcecode from '!!raw-loader!./TextSelectionViewer.tsx';

export default () => {
  class TextSelectionStory extends Component {
    constructor(props) {
      super(props);
      this.state = {};
    }

    render() {
      return (
        <Page title="Click To Tweet">
          <Section type={Section.Types.COMPARISON}>
            <RichContentViewerBox sourcecode={viewerSourcecode}>
              <TextSelectionViewer content={content} />
            </RichContentViewerBox>
          </Section>
        </Page>
      );
    }
  }
  return <TextSelectionStory />;
};
