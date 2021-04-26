import React, { Fragment, ComponentType, Children, FunctionComponent, ReactElement } from 'react';
import FullscreenProvider from './fullscreen/FullscreenProvider';
import { RicosViewerProps } from 'ricos-common';
import { IMAGE_TYPE, GALLERY_TYPE } from 'wix-rich-content-common';

const RicosModal: FunctionComponent<RicosViewerProps & { children: ReactElement }> = props => {
  let ModalProvider: ComponentType = Fragment;
  let modalProps = {};
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
    modalProps = props;
  }

  const child = Children.only(React.cloneElement(props.children, { ...props }));
  return <ModalProvider {...modalProps}>{child}</ModalProvider>;
};

export default RicosModal;
