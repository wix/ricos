import React, { Fragment, ComponentType, Children, FunctionComponent } from 'react';
import FullscreenProvider from './fullscreen/FullscreenProvider';
import { RicosViewerProps, RichContentChild } from '../index';
import { IMAGE_TYPE, GALLERY_TYPE } from 'wix-rich-content-common';

const RicosModal: FunctionComponent<RicosViewerProps & { children: RichContentChild }> = props => {
  let ModalProvider: ComponentType = Fragment;

  const {
    children: {
      props: { config },
    },
  } = props;
  const { [IMAGE_TYPE]: imageConfig, [GALLERY_TYPE]: galleryConfig } = config || {};
  const needsFullscreenProvider = !imageConfig?.onExpand || !galleryConfig?.onExpand;
  const isExpandDisabled =
    (!imageConfig || imageConfig.disableExpand) && (!galleryConfig || galleryConfig?.disableExpand);

  if (!isExpandDisabled && needsFullscreenProvider) {
    ModalProvider = FullscreenProvider;
  }

  const child = Children.only(React.cloneElement(props.children, { ...props }));
  return <ModalProvider {...props}>{child}</ModalProvider>;
};

export default RicosModal;
