import React, { Fragment, ComponentType, Children, FunctionComponent } from 'react';
import FullscreenProvider from './fullscreen/FullscreenProvider';
import { RicosViewerProps, RichContentChild } from '../index';

const RicosModal: FunctionComponent<RicosViewerProps & { children: RichContentChild }> = props => {
  let ModalProvider: ComponentType = Fragment;

  const { children } = props;
  const { onExpand } = children.props.helpers || {};
  const hasCustomOnExpand =
    onExpand ||
    children.props.config?.['wix-draft-plugin-gallery']?.onExpand ||
    children.props.config?.['wix-draft-plugin-image']?.onExpand;

  if (!hasCustomOnExpand) {
    ModalProvider = FullscreenProvider;
  }

  const child = Children.only(React.cloneElement(props.children, { ...props }));
  return <ModalProvider {...props}>{child}</ModalProvider>;
};

export default RicosModal;
