import React from 'react';
import { RichContentEditorModal } from 'wix-rich-content-editor';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';

export default function EditorModal({
  isOpen,
  contentLabel,
  style,
  role,
  onRequestClose,
  ModalsMap,
  locale,
  ...modalProps
}) {
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
}

EditorModal.propTypes = {
  isOpen: PropTypes.bool,
  contentLabel: PropTypes.string,
  locale: PropTypes.string.isRequired,
  style: PropTypes.object,
  role: PropTypes.string,
  onRequestClose: PropTypes.func,
  ModalsMap: PropTypes.object,
};
