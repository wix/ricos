import React from 'react';
import PropTypes from 'prop-types';
import FocusManager from '../Components/FocusManager';

const RichContentModal = ({ modalElement, ...modalProps }) => {
  
  const ModalElement = modalElement;
  return (
    <FocusManager>
      <ModalElement {...modalProps} />
      {(modalProps.isFlyOutModal) ? <div style={modalProps.style.arrow}> </div> : null}
    </FocusManager>);
};

RichContentModal.propTypes = {
  modalElement: PropTypes.func,
  modalProps: PropTypes.object,
};

export default RichContentModal;
