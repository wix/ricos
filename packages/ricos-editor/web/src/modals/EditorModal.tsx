import React, { Component } from 'react';
import { RichContentEditorModal } from 'wix-rich-content-editor';
import ReactModal from 'react-modal';
import { ModalsMap, ModalSettings } from '../index';

interface Props {
  isOpen: boolean;
  contentLabel?: string;
  locale: string;
  style?: Record<string, unknown>;
  role?: string;
  onRequestClose?: ReactModal.Props['onRequestClose'];
  ModalsMap?: ModalsMap;
  ariaHiddenId?: ModalSettings['ariaHiddenId'];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [propName: string]: any;
}

export default class EditorModal extends Component<Props> {
  componentDidMount() {
    this.updateAriaHiddenId(this.props.ariaHiddenId);
  }

  componentWillReceiveProps(newProps: Props) {
    if (newProps.ariaHiddenId !== this.props.ariaHiddenId) {
      this.updateAriaHiddenId(newProps.ariaHiddenId);
    }
  }

  updateAriaHiddenId = (ariaHiddenId: ModalSettings['ariaHiddenId']) =>
    ReactModal.setAppElement(ariaHiddenId || 'body');

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
