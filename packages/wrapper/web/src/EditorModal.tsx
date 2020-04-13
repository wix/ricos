import React from 'react';
import { RichContentEditorModal } from 'wix-rich-content-editor';
import ReactModal from 'react-modal';

interface Props {
  isOpen: boolean;
  contentLabel?: string;
  locale: string;
  style?: object;
  role?: string;
  onRequestClose?: ReactModal.Props['onRequestClose'];
  ModalsMap?: ModalsMap;
  [propName: string]: any;
}

export default function EditorModal({
  isOpen,
  contentLabel,
  style,
  role,
  onRequestClose,
  ModalsMap,
  locale,
  ...modalProps
}: Props) {
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
