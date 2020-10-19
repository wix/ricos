import React, { Fragment, ComponentType, Children, FunctionComponent, ReactElement } from 'react';
import EditorModalProvider from './EditorModalProvider';
import { RicosEditorProps } from 'ricos-common';

const RicosModal: FunctionComponent<RicosEditorProps & { children: ReactElement }> = props => {
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
