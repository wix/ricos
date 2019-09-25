import dedent from 'dedent';
import React, { PureComponent } from 'react';
import ReactModal from 'react-modal';
import MonacoEditor from 'react-monaco-editor';
import { RichContentViewer } from 'wix-rich-content-viewer';
import { RichContentModal } from 'wix-rich-content-common';
import { ContentStateTransformation } from 'wix-rich-content-preview';
import * as PropTypes from 'prop-types';
import * as Plugins from './PreviewPlugins';
import theme from '../theme/theme'; // must import after custom styles

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
    ReactModal.setAppElement('#root');
    this.state = {
      disabled: false,
    };
    this.transformation = new ContentStateTransformation({
      _if: metadata => metadata.media.images().length > 3,
      _then: (metadata, preview) => preview.gallery({
        mediaInfo: metadata.media.images().slice(0, 3),
      })
    }).rule({
        _if: metadata => metadata.text.plain.array().length > 0,
        _then: (metadata, preview) => preview.plain(metadata.text.plain.array()[0])
    });
  }

  formatCode = (rules) => rules.reduce((formatted, rule) => {
    return formatted.concat(dedent(`if: ${ rule._if.replace('function _if(metadata)', 'metadata => ')
                            .replace('{return ', '').slice(0, -1) }
                   then: ${ rule._then.replace('function _then(metadata,preview)', '(metadata, preview) => ').replace('{return ', '').slice(0, -1) }`).concat('\n\n'));
  }, '');

  closeModal = () => {
    this.setState({
      showModal: false,
      modalContent: null,
    });
  };

  render() {
    return (
      <div id="rich-content-preview" className="viewer">
        <div style={{ height: '50vh', width: '100%' }}>
          <RichContentViewer
            helpers={this.helpers}
            typeMappers={Plugins.typeMappers}
            inlineStyleMappers={Plugins.getInlineStyleMappers(this.props.initialState)}
            decorators={Plugins.decorators}
            config={Plugins.config}
            initialState={this.transformation.apply(this.props.initialState).get()}
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
      <div style={{ height: '50vh', width: '100%' }}>
        <MonacoEditor language="es6" value={dedent`Rules: 
          ${ this.formatCode(this.transformation.toObject()) }`}/>  
      </div>
    </div>
    );
  }
}

Preview.propTypes = {
  initialState: PropTypes.any,
  isMobile: PropTypes.bool,
};
