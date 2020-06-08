/* eslint-disable react/prop-types */
import React, { Fragment, ComponentType, Children, FunctionComponent } from 'react';
import { EngineProps } from '../RicosEngine';
import EditorModalProvider from './editorModal/EditorModalProvider';
import FullscreenProvider from './fullscreen/FullscreenProvider';

const RicosModal: FunctionComponent<EngineProps> = props => {
  let ModalProvider: ComponentType = Fragment;
  const { isViewer, children } = props;
  const { openModal, closeModal, onExpand } = children.props.helpers || {};
  const hasCustomOnExpand =
    onExpand ||
    children.props.config['wix-draft-plugin-gallery']?.onExpand ||
    children.props.config['wix-draft-plugin-image']?.onExpand;
  const addEditorModal = !openModal && !closeModal;

  if (isViewer && !hasCustomOnExpand) {
    ModalProvider = FullscreenProvider;
  } else if (!isViewer && addEditorModal) {
    ModalProvider = EditorModalProvider;
  }

  const child = Children.only(React.cloneElement(props.children, { ...props }));
  return <ModalProvider {...props}>{child}</ModalProvider>;
};

export default RicosModal;
