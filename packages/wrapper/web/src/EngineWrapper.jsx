import React, { Children } from 'react';
import PropTypes from 'prop-types';
import { modalStyles } from './themeStrategy/defaults';

class EngineWrapper extends React.Component {
  render() {
    const { strategies = [], Modal, modalState, children = {} } = this.props;
    const modifiedProps = strategies.reduce((props, strategyFunction) => {
      const result = strategyFunction(props);
      return { ...props, ...result };
    }, children.props);
    const { helpers = {}, theme, locale = 'en', ModalsMap } = modifiedProps;
    const { onRequestClose } = this.state.modalProps || {};
    if (Modal) {
      helpers.openModal = this.onModalOpen;
      helpers.closeModal = this.onModalClose;
      modifiedProps.helpers = helpers;
    }
    return (
      <React.Fragment>
        {Children.only(React.cloneElement(children, modifiedProps))}
        {Modal && (
          <Modal
            isOpen={modalState.showModal}
            contentLabel="External Modal Example"
            style={modalStyles(modalState, theme)}
            role="dialog"
            onRequestClose={onRequestClose || helpers.closeModal}
            modalsMap={ModalsMap}
            locale={locale}
            {...modalState.modalProps}
          />
        )}
      </React.Fragment>
    );
  }
}
EngineWrapper.propTypes = {
  strategies: PropTypes.array,
  plugins: PropTypes.arrayOf(PropTypes.object),
  theme: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  onRequestModalClose: PropTypes.func,
  openModal: PropTypes.func,
  closeModal: PropTypes.func,
  children: PropTypes.object,
  Modal: PropTypes.object,
  modalState: PropTypes.shape({
    modalProps: PropTypes.object,
    showModal: PropTypes.bool,
  }),
};
export default EngineWrapper;
