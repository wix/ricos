/* eslint-disable react/prop-types */
import React, { Fragment, ComponentType, Children, FunctionComponent } from 'react';
import { EngineProps } from '../RicosEngine';
import EditorModalProvider from './editorModal/EditorModalProvider';
import FullscreenProvider from './fullscreen/FullscreenProvider';

const RicosModal: FunctionComponent<EngineProps> = props => {
  let ModalProvider: ComponentType = Fragment;
  const { isViewer, children } = props;
  const { openModal, closeModal, config } = children.props;
  const onExpand =
    config['wix-draft-plugin-image']?.onExpand || config['wix-draft-plugin-gallery']?.onExpand;
  if (onExpand && !config['wix-draft-plugin-gallery']?.onExpand) {
    config['wix-draft-plugin-gallery'].onExpand = onExpand;
  }
  const addFullscreenModal = !onExpand;
  const addEditorModal = !openModal && !closeModal;

  if (isViewer && addFullscreenModal) {
    ModalProvider = FullscreenProvider;
  } else if (!isViewer && addEditorModal) {
    ModalProvider = EditorModalProvider;
  }

  const child = Children.only(React.cloneElement(props.children, { ...props }));
  return <ModalProvider {...props}>{child}</ModalProvider>;
};

export default RicosModal;
