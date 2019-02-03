import React, { Component } from 'react';
import { convertFromRaw, convertToRaw, EditorState, SelectionState } from '@wix/draft-js';
import deepFreeze from 'deep-freeze';
import { RichContentEditor } from 'wix-rich-content-editor';
import 'wix-rich-content-common/dist/styles.min.css';
import 'wix-rich-content-editor/dist/styles.min.css';

class Editor extends Component {
  state = {
    editorState: this.props.raw ?
      EditorState.createWithContent(convertFromRaw(this.props.raw)) :
      EditorState.createEmpty(),
  };

  constructor(props) {
    super(props);

    if (isBrowser()) {
      window.setEditorSelection = this.setSelection;
    }
  }

  setSelection = ({
    anchorBlockIndex,
    anchorOffset,
    focusBlockIndex = anchorBlockIndex,
    focusOffset = anchorOffset,
  }) => {
    const { editorState } = this.state;
    const blocks = editorState.getCurrentContent().getBlocksAsArray();
    const selection = new SelectionState({
      anchorKey: blocks[anchorBlockIndex].key,
      anchorOffset,
      focusKey: blocks[focusBlockIndex].key,
      focusOffset,
    });

    this.setState({
      editorState: EditorState.forceSelection(editorState, selection),
    })
  };

  handleChange = editorState => {
    this.setState({ editorState });
    if (typeof window !== 'undefined') {
      const raw = deepFreeze(convertToRaw(editorState.getCurrentContent()));
      window.__CONTENT_STATE__ = raw;
      window.__CONTENT_SNAPSHOT__ = {
        ...raw,
        // blocks keys are random so for snapshot diffing they are changed to indexes
        blocks: raw.blocks.map((block, index) => ({ ...block, key: index})),
      };
    }
  };

  render() {
    return (
      <RichContentEditor editorState={this.state.editorState} onChange={this.handleChange}/>
    );
  }
}

const isBrowser = () => typeof window !== 'undefined';

export default Editor;
