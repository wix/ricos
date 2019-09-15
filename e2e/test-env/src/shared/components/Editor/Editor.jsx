import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { convertFromRaw, convertToRaw, EditorState } from '@wix/draft-js';
import deepFreeze from 'deep-freeze';
import { RichContentEditor, RichContentEditorModal } from 'wix-rich-content-editor';
import 'wix-rich-content-common/dist/styles.min.css';
import 'wix-rich-content-editor/dist/styles.min.css';
import ReactModal from 'react-modal';
import ModalsMap from './ModalsMap';
import * as Plugins from './editorPlugins';
import theme from '../../theme';

const modalStyleDefaults = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};
const anchorTarget = '_blank';
const relValue = 'nofollow';

class Editor extends Component {
  static propTypes = {
    initialState: PropTypes.object,
    isMobile: PropTypes.bool,
    locale: PropTypes.string,
  };

  state = {
    editorState: EditorState.createWithContent(convertFromRaw(this.props.initialState)),
  };
  componentDidMount() {
    ReactModal.setAppElement('#root');
  }

  handleChange = editorState => {
    this.setState({ editorState });
    if (typeof window !== 'undefined') {
      // ensures that tests fail when entity map is mutated
      const raw = convertToRaw(editorState.getCurrentContent());
      // const raw = deepFreeze(rr);
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
    onVideoSelected: (url, updateEntity) => {
      setTimeout(() => {
        const testVideo = testVideos[Math.floor(Math.random() * testVideos.length)];
        updateEntity(testVideo);
      }, 500);
    },
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
    const modalStyles = {
      content: Object.assign({}, modalStyleDefaults.content),
    };
    const { onRequestClose } = this.state.modalProps || {};
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
          anchorTarget={anchorTarget}
          relValue={relValue}
          helpers={this.helpers}
          locale={this.props.locale}
          localeResource={this.props.localeResource}
        />
        <ReactModal
          isOpen={this.state.showModal}
          contentLabel="External Modal Example"
          style={modalStyles}
          role="dialog"
          onRequestClose={onRequestClose || this.helpers.closeModal}
        >
          <RichContentEditorModal
            modalsMap={ModalsMap}
            locale={this.props.locale}
            {...this.state.modalProps}
          />
        </ReactModal>
      </>
    );
  }
}

export default Editor;
