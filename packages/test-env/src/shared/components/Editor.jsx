import React, { Component } from 'react';
import { convertFromRaw, convertToRaw, EditorState, SelectionState } from '@wix/draft-js';
import deepFreeze from 'deep-freeze';
import { RichContentEditor } from 'wix-rich-content-editor';
import 'wix-rich-content-common/dist/styles.min.css';
import 'wix-rich-content-editor/dist/styles.min.css';

class Editor extends Component {
  state = {
    editorState: EditorState.createWithContent(convertFromRaw(this.props.initialState)),
  };

  constructor(props) {
    super(props);

    if (isBrowser()) {
      window.rce = {
        setSelection: this.setSelection,
        moveSelectionToEnd: this.moveSelectionToEnd,
        focus: this.focus,
      };
    }
  }

  focus = ({}) => {
    const { editorState } = this.state;
    this.setState({
      editorState: EditorState.forceSelection(editorState, editorState.getSelection()),
    })
  };

  setSelection = ({
    anchorBlockIndex = 0,
    anchorOffset = 0,
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
    });
  };

  moveSelectionToEnd = () => {
    this.setState({
      editorState: EditorState.moveFocusToEnd(this.state.editorState),
    });
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
      <RichContentEditor editorKey="rce" editorState={this.state.editorState} onChange={this.handleChange}/>
    );
  }
}

const isBrowser = () => typeof window !== 'undefined';

export default Editor;
