import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RichContentEditorModal from './RichContentEditorModal';
import ClickOutside from 'react-click-outside';
import { getLangDir } from 'wix-rich-content-common';

class InnerModal extends Component {
  render() {
    const { theme, locale, modalProps, modalStyles, showInnerModal, closeInnerModal } = this.props;
    const { toolbarOffsetTop, toolbarOffsetLeft } = modalProps || {};
    const dir = getLangDir(locale);
    const modalStyleDefaults = {
      position: 'absolute',
      top: toolbarOffsetTop,
      left: dir === 'ltr' ? toolbarOffsetLeft : 'auto',
      right: dir === 'rtl' ? toolbarOffsetLeft : 'auto',
      bottom: 'auto',
      border: 'solid 1px #ededed',
      background: 'rgb(255, 255, 255)',
      borderRadius: '6px',
      maxWidth: '420px',
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
