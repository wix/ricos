import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RichContentEditorModal from './RichContentEditorModal';
import ClickOutside from 'react-click-outside';
import { getLangDir } from 'wix-rich-content-common';

class InnerModal extends Component {
  render() {
    const { theme, locale, innerModal, closeInnerModal } = this.props;
    const { top, left } = innerModal?.modalProps || {};
    const dir = getLangDir(locale);
    const modalStyleDefaults = {
      position: 'absolute',
      top,
      left: dir === 'ltr' ? left : 'auto',
      right: dir === 'rtl' ? left : 'auto',
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
      ...innerModal?.modalStyles,
    };
    return innerModal ? (
      <ClickOutside onClickOutside={closeInnerModal}>
        <div
          style={{
            ...innerModalStyles,
          }}
          className={theme.innerModalTheme}
        >
          <RichContentEditorModal
            modalsMap={undefined}
            locale={locale}
            {...innerModal?.modalProps}
          />
        </div>
      </ClickOutside>
    ) : null;
  }
}

InnerModal.propTypes = {
  theme: PropTypes.object,
  locale: PropTypes.string.isRequired,
  innerModal: PropTypes.object,
  closeInnerModal: PropTypes.func,
};

export default InnerModal;
