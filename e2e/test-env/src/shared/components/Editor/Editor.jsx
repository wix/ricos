import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { convertFromRaw, convertToRaw, EditorState } from '@wix/draft-js';
import deepFreeze from 'deep-freeze';
import { RichContentEditor } from 'wix-rich-content-editor';
import 'wix-rich-content-common/dist/styles.min.css';
import 'wix-rich-content-editor/dist/styles.min.css';
import theme from '../../theme';
import * as Plugins from './editorPlugins';

class Editor extends Component {
  static propTypes = {
    initialState: PropTypes.object,
    isMobile: PropTypes.bool,
    locale: PropTypes.string,
  };

  state = {
    editorState: EditorState.createWithContent(convertFromRaw(this.props.initialState)),
  };

  handleChange = editorState => {
    this.setState({ editorState });
    if (typeof window !== 'undefined') {
      // ensures that tests fail when entity map is mutated
      const rr = convertToRaw(editorState.getCurrentContent());
      const raw = deepFreeze(rr);
      window.__CONTENT_STATE__ = raw;
      window.__CONTENT_SNAPSHOT__ = {
        ...raw,
        // blocks keys are random so for snapshot diffing they are changed to indexes
        blocks: raw.blocks.map((block, index) => ({ ...block, key: index })),
      };
    }
  };

  helpers = {
    onFilesChange: () => {},
    onVideoSelected: () => {},
    openModal: data => {
      const { modalStyles, ...modalProps } = data;
      try {
        document.documentElement.style.height = '100%';
        document.documentElement.style.position = 'relative';
      } catch (e) {
        console.warn('Cannot change document styles', e);
      }
      this.setState({
        showModal: true,
        modalProps,
        modalStyles,
      });
    },
    closeModal: () => {
      try {
        document.documentElement.style.height = 'initial';
        document.documentElement.style.position = 'initial';
      } catch (e) {
        console.warn('Cannot change document styles', e);
      }
      this.setState({
        showModal: false,
        modalProps: null,
        modalStyles: null,
        modalContent: null,
      });
    },
  };
  render() {
    return (
      <>
        Editor
        <RichContentEditor
          editorKey="rce"
          editorState={this.state.editorState}
          onChange={this.handleChange}
          theme={theme}
          plugins={Plugins.editorPlugins}
          config={Plugins.config}
          isMobile={this.props.isMobile}
          helpers={this.helpers}
          locale={this.props.locale}
        />
      </>
    );
  }
}

export default Editor;
