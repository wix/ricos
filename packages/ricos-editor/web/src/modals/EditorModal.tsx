import React, { Component } from 'react';
import { RichContentEditorModal } from 'wix-rich-content-editor';
import ReactModal from 'react-modal';
import { ModalsMap } from '../index';
import { ModalSettings } from 'wix-rich-content-common';

interface Props {
  isOpen: boolean;
  contentLabel?: string;
  locale: string;
  style?: Record<string, unknown>;
  role?: string;
  onRequestClose?: ReactModal.Props['onRequestClose'];
  ModalsMap?: ModalsMap;
  ariaHiddenId?: ModalSettings['ariaHiddenId'];
  target?: string;
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

  parentSelector = (): HTMLElement => {
    const { target } = this.props;
    let element: HTMLElement | null = document.body;
    if (target) {
      element = document.getElementById(target);
    }
    return element || document.body;
  };

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
        parentSelector={this.parentSelector}
        onRequestClose={onRequestClose}
      >
        <RichContentEditorModal modalsMap={ModalsMap} locale={locale} {...modalProps} />
      </ReactModal>
    );
  }
}
