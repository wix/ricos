import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Editor from 'draft-js-plugins-editor';
import { EditorState, convertFromRaw } from 'wix-rich-content-editor-common';

class InnerRCEReadOnly extends Component {
  constructor(props) {
    super(props);
    const { innerContentState } = props;
    const innerRCEEditorState = EditorState.createWithContent(convertFromRaw(innerContentState));
    this.state = { innerRCEEditorState };
  }
  componentWillReceiveProps(nextProps) {
    if (this?.props?.innerContentState !== nextProps?.innerContentState) {
      const innerRCEEditorState = EditorState.createWithContent(
        convertFromRaw(nextProps.innerContentState)
      );
      this.setState({ innerRCEEditorState });
    }
  }
  render() {
    const { renderStyleTag, blockStyleFn, innerRCEPlugins, innerRCECustomStyleFn } = this.props;
    const { innerRCEEditorState } = this.state;
    return (
      <div style={{ pointerEvents: 'none' }}>
        {renderStyleTag(innerRCEEditorState)}
        <Editor
          ref={innerEditorRef => (this.innerEditorRef = innerEditorRef)}
          editorState={innerRCEEditorState}
          blockStyleFn={blockStyleFn}
          plugins={innerRCEPlugins}
          customStyleFn={innerRCECustomStyleFn}
          onChange={innerRCEEditorState => {
            this.setState({ innerRCEEditorState });
          }}
        />
      </div>
    );
  }
}

InnerRCEReadOnly.propTypes = {
  innerContentState: PropTypes.object,
  renderStyleTag: PropTypes.func,
  blockStyleFn: PropTypes.object,
  innerRCEPlugins: PropTypes.array,
  innerRCECustomStyleFn: PropTypes.func,
};

export default InnerRCEReadOnly;
