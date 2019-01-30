import React, { Component } from 'react';
import { convertFromRaw, convertToRaw, EditorState } from '@wix/draft-js';
import { RichContentEditor } from 'wix-rich-content-editor';
import deepFreeze from 'deep-freeze';
import 'wix-rich-content-common/dist/styles.min.css';
import 'wix-rich-content-editor/dist/styles.min.css';

class Editor extends Component {
  state = {
    editorState: this.props.raw ?
      EditorState.createWithContent(convertFromRaw(this.props.raw)) :
      EditorState.createEmpty(),
  };

  handleChange = editorState => {
    this.setState({ editorState });
    window.__CONTENT_STATE__ = deepFreeze(convertToRaw(editorState.getCurrentContent()));
  };

  render() {
    return (
      <RichContentEditor editorState={this.state.editorState} onChange={this.handleChange}/>
    );
  }
}

export default Editor;
