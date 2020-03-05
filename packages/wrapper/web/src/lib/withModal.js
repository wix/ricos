import React, { Children } from 'react';
import { RichContentEditorModal } from 'wix-rich-content-editor';
import ReactModal from 'react-modal';

export default function withModal(editorComp) {
  const Modal = ({ isOpen, contentLabel, style, role, onRequestClose, ModalsMap, locale }) => {
    <ReactModal
      isOpen={isOpen}
      contentLabel={contentLabel}
      style={style}
      role={role}
      onRequestClose={onRequestClose}
    >
      <RichContentEditorModal modalsMap={ModalsMap} locale={locale} {...this.state.modalProps} />
    </ReactModal>;
  };

  return Children.only(React.cloneElement(editorComp, { Modal }));
}
