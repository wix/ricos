import React, { Children } from 'react';
import { RichContentEditorModal } from 'wix-rich-content-editor';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';

export function withModal(editorComp) {
  const ModalComp = ({
    isOpen,
    contentLabel,
    style,
    role,
    onRequestClose,
    ModalsMap,
    locale,
    ...modalProps
  }) => {
    return (
      <ReactModal
        isOpen={isOpen}
        contentLabel={contentLabel}
        style={style}
        role={role}
        onRequestClose={onRequestClose}
      >
        <RichContentEditorModal modalsMap={ModalsMap} locale={locale} {...modalProps} />
      </ReactModal>
    );
  };

  ModalComp.propTypes = {
    isOpen: PropTypes.bool,
    contentLabel: PropTypes.string,
    locale: PropTypes.string.isRequired,
    style: PropTypes.object,
    role: PropTypes.string,
    onRequestClose: PropTypes.func,
    ModalsMap: PropTypes.object,
  };

  return Children.only(React.cloneElement(editorComp, { ModalComp }));
}
