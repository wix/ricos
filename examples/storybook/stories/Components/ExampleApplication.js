import React from 'react';
import { RichContentEditorBox, RichContentViewerBox, Section } from './StoryParts';
import PropTypes from 'prop-types';

import { convertToRaw } from 'wix-rich-content-editor';

import EditorWrapper from './EditorWrapper';
import ViewerWrapper from './ViewerWrapper';
import { debounce } from 'lodash';
import editorSourceCode from '!!raw-loader!../Components/EditorWrapper';
import viewerSourceCode from '!!raw-loader!../Components/ViewerWrapper';

export default class ExampleApplication extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contentState: props.initialState,
    };
    this.onChange = debounce(editorState => {
      this.setState({ contentState: convertToRaw(editorState.getCurrentContent()) });
    }, 200);
  }

  render() {
    const { contentState } = this.state;
    const { palette } = this.props;
    return (
      <Section type={Section.Types.COMPARISON}>
        <RichContentEditorBox sourcecode={editorSourceCode}>
          <EditorWrapper contentState={contentState} onChange={this.onChange} palette={palette} />
        </RichContentEditorBox>
        <RichContentViewerBox sourcecode={viewerSourceCode}>
          <ViewerWrapper contentState={contentState} palette={palette} />
        </RichContentViewerBox>
      </Section>
    );
  }
}

ExampleApplication.propTypes = {
  initialState: PropTypes.object,
  palette: PropTypes.arrayOf(PropTypes.object),
};
