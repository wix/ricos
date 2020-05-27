/* eslint-disable react/prop-types */
import React, { Fragment, ComponentType, Children, FunctionComponent } from 'react';

import EditorModalProvider from './EditorModalProvider';

interface RicosModalProps extends RicosEditorProps {
  children: RichContentChild;
}
const RicosModal: FunctionComponent<RicosModalProps> = props => {
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
