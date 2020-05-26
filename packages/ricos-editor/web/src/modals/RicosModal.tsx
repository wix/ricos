/* eslint-disable react/prop-types */
import React, { Fragment, ComponentType, Children, FunctionComponent } from 'react';
// import { EngineProps } from '../RicosEngine';
import EditorModalProvider from './EditorModalProvider';

// const RicosModal: FunctionComponent<EngineProps> = props => {
const RicosModal: FunctionComponent<any> = props => {
  let ModalProvider: ComponentType = Fragment;
  const {
    children: {
      props: { helpers = {} },
    },
  } = props;
  const { openModal, closeModal } = helpers;

  if (!openModal && !closeModal) {
    ModalProvider = EditorModalProvider;
  }

  const child = Children.only(React.cloneElement(props.children, { ...props }));
  return <ModalProvider {...props}>{child}</ModalProvider>;
};

export default RicosModal;
