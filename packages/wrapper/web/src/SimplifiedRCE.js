import React, { Children } from 'react';
import { RichContentEditorModal } from 'wix-rich-content-editor';
import ReactModal from 'react-modal';
import PropTypes from 'prop-types';
import { modalStyles } from './defaults';

export default class SimplifiedRCE extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };
  }

  onModalOpen = data => {
    const { modalStyles, ...modalProps } = data;
    this.setState({
      showModal: true,
      modalProps,
      modalStyles,
    });
  };

  onModalClose = () =>
    this.setState({
      showModal: false,
      modalProps: null,
      modalStyles: null,
      modalContent: null,
    });

  render() {
    const { strategies = [], openModal, closeModal, children, ...rest } = this.props;
    const modifiedProps = strategies.reduce(
      (props, stratFunc) => Object.assign(props, stratFunc(rest)),
      rest
    );
    const { helpers = {}, theme, locale, ModalsMap } = modifiedProps;
    const { onRequestClose } = this.state.modalProps || {};
    helpers.openModal = data => this.onModalOpen(data) && openModal?.(data);
    helpers.closeModal = () => this.onModalClose() && closeModal?.();
    modifiedProps.helpers = helpers;
    return (
      <React.Fragment>
        {Children.only(React.cloneElement(children, modifiedProps))}
        <ReactModal
          isOpen={this.state.showModal}
          contentLabel="External Modal Example"
          style={modalStyles(this.state, theme)}
          role="dialog"
          onRequestClose={onRequestClose || helpers.closeModal}
        >
          <RichContentEditorModal
            modalsMap={ModalsMap}
            locale={locale}
            {...this.state.modalProps}
          />
        </ReactModal>
      </React.Fragment>
    );
  }
}
SimplifiedRCE.propTypes = {
  strategies: PropTypes.array,
  settings: PropTypes.shape({
    plugins: PropTypes.arrayOf(PropTypes.object),
    theme: PropTypes.object,
  }),
  onRequestModalClose: PropTypes.func,
  openModal: PropTypes.func,
  closeModal: PropTypes.func,
  children: PropTypes.object,
};
