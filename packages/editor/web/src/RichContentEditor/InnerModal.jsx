import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RichContentEditorModal from './RichContentEditorModal';
import ClickOutside from 'react-click-outside';

class InnerModal extends Component {
  render() {
    const { theme, locale, modalProps, modalStyles, showInnerModal, closeInnerModal } = this.props;
    const { toolbarOffsetTop } = modalProps || {};
    const modalStyleDefaults = {
      position: 'absolute',
      top: toolbarOffsetTop,
      left: '0px',
      right: '0px',
      bottom: 'auto',
      border: 'solid 1px #ededed',
      background: 'rgb(255, 255, 255)',
      borderRadius: '6px',
      maxWidth: '420px',
      direction: 'ltr',
      zIndex: 6,
      transform: 'none',
      marginLeft: 'auto',
      marginRight: 'auto',
      boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.07)',
    };
    const innerModalStyles = {
      ...modalStyleDefaults,
      ...modalStyles,
      ...theme?.innerModalTheme,
    };
    return showInnerModal ? (
      <ClickOutside onClickOutside={closeInnerModal}>
        <div
          style={{
            ...innerModalStyles,
          }}
        >
          <RichContentEditorModal modalsMap={undefined} locale={locale} {...modalProps} />
        </div>
      </ClickOutside>
    ) : null;
  }
}

InnerModal.propTypes = {
  theme: PropTypes.object,
  locale: PropTypes.string.isRequired,
  modalProps: PropTypes.object,
  modalStyles: PropTypes.object,
  showInnerModal: PropTypes.bool,
  closeInnerModal: PropTypes.func,
};

export default InnerModal;
