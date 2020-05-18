import React, { Component } from 'react';
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

export default class EditorModal extends Component<Props, {}> {
  componentDidMount() {
    ReactModal.setAppElement('body');
  }
  render() {
    const {
      isOpen,
      contentLabel,
      style,
      role,
      onRequestClose,
      ModalsMap,
      locale,
      ...modalProps
    } = this.props;
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
}
