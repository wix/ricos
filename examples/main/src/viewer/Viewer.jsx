import { PureComponent } from 'react';
import ReactModal from 'react-modal';
import { RichContentViewer } from 'wix-rich-content-viewer';
import * as PropTypes from 'prop-types';
import React from 'react';
import * as Plugins from './ViewerPlugins';
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

export default class Viewer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  closeModal = () => {
    this.setState({
      showModal: false,
      modalContent: null,
    });
  };

  render() {
    return (
      <div className="viewer">
        <RichContentViewer
          helpers={this.helpers}
          typeMappers={Plugins.typeMappers}
          decorators={Plugins.decorators}
          config={Plugins.config}
          initialState={this.props.initialState}
          theme={theme}
          isMobile={this.props.mobile}
          anchorTarget={anchorTarget}
          relValue={relValue}
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

Viewer.propTypes = {
  initialState: PropTypes.any,
  mobile: PropTypes.any,
  config: PropTypes.any,
};
