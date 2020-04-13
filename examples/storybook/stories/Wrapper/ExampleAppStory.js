import React from 'react';
import {
  RichContentEditorBox,
  RichContentViewerBox,
  Section,
  Page,
} from '../Components/StoryParts';

import { convertToRaw } from 'wix-rich-content-editor';

import dividerContentState from '../../../../e2e/tests/fixtures/divider.json';
import EditorWrapper from '../Components/EditorWrapper';
import ViewerWrapper from '../Components/ViewerWrapper';
// import DividerEditor from './WrapperBasicUsage';
// import sourcecode from '!!raw-loader!./WrapperBasicUsage.js';

export default () => {
  return (
    <Page title="Example App">
      <Section type={Section.Types.COMPARISON}>
        <ExampleAppStory />
      </Section>
    </Page>
  );
};

class ExampleAppStory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contentState: dividerContentState,
    };
  }

  onChange = editorState =>
    this.setState({ contentState: convertToRaw(editorState.getCurrentContent()) });
  render() {
    const { contentState } = this.state;
    return (
      <React.Fragment>
        <RichContentEditorBox>
          <EditorWrapper contentState={dividerContentState} onChange={this.onChange} />
        </RichContentEditorBox>
        <RichContentViewerBox>
          <ViewerWrapper contentState={contentState} />
        </RichContentViewerBox>
      </React.Fragment>
    );
  }
}
