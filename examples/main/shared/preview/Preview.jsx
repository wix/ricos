import React, { PureComponent } from 'react';
import ReactModal from 'react-modal';
// import MonacoEditor from 'react-monaco-editor';
import { RichContentModal, isSSR } from 'wix-rich-content-common';
import {
  ContentStateTransformation,
  RichContentPreview,
} from 'wix-rich-content-preview';
import * as PropTypes from 'prop-types';
import * as Plugins from './PreviewPlugins';
import theme from '../theme/theme'; // must import after custom styles
import 'wix-rich-content-preview/dist/styles.min.css';
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

const anchorTarget = '_top';
const relValue = 'noreferrer';

export default class Preview extends PureComponent {
  constructor(props) {
    super(props);
    if (!isSSR()) {
      ReactModal.setAppElement('#root');
    }
    this.state = {
      disabled: false,
    };
    this.transformation = new ContentStateTransformation({
      _if: metadata => metadata.text.plain().length > 0,
      _then: (metadata, preview) =>
        preview
          .plain(metadata.text.plain()[0])
          .readMore({ lines: 3 }),
    }).rule({
      _if: metadata => metadata.media.images().length > 3,
      _then: (metadata, preview) =>
        preview
          .gallery({
            mediaInfo: metadata.media.images().slice(0, 3),
          })
          .imageCounter({ counter: metadata.media.images().length - 3 })
          .seeFullPost({ label: 'SEE FULL STORY' })
    });
  }

  closeModal = () => {
    this.setState({
      showModal: false,
      modalContent: null,
    });
  };


  helpers = {};

  render() {
    return (
      <div id="rich-content-preview" className="viewer">
        <RichContentPreview
          helpers={this.helpers}
          typeMappers={Plugins.typeMappers}
          inlineStyleMappers={Plugins.getInlineStyleMappers(this.props.initialState)}
          decorators={Plugins.decorators}
          config={Plugins.config}
          initialState={this.props.initialState}
          transformation={this.transformation}
          theme={theme}
          isMobile={this.props.isMobile}
          anchorTarget={anchorTarget}
          relValue={relValue}
          disabled={this.state.disabled}
        />
        <ReactModal
          isOpen={this.state.showModal}
          contentLabel="External Modal Example"
          style={this.state.modalStyles || modalStyleDefaults}
          onRequestClose={this.closeModal}
        >
          {this.state.showModal && <RichContentModal {...this.state.modalProps} />}
        </ReactModal>
      </div>
    );
  }
}

Preview.propTypes = {
  initialState: PropTypes.any,
  isMobile: PropTypes.bool,
};
