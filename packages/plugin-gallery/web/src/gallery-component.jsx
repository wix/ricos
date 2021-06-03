import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Loader } from 'wix-rich-content-plugin-commons';
import { isEqual } from 'lodash';
import GalleryViewer from './gallery-viewer';
import { DEFAULTS } from './defaults';
import { GALLERY_TYPE } from './types';
import styles from '../statics/styles/gallery-component.scss';

const renderMobileNativeLoader = ({ url }) =>
  url ? null : (
    <div className={styles.mobileNativeLoaderContainer}>
      <Loader type={'mini'} disableProgress />
    </div>
  );
function GalleryComponent(props) {
  return (
    <GalleryViewer
      componentData={props.componentData}
      onClick={props.onClick}
      className={props.className}
      settings={props.settings}
      theme={props.theme}
      helpers={props.helpers}
      disableRightClick={props.disableRightClick}
      isMobile={props.isMobile}
      anchorTarget={props.anchorTarget}
      relValue={props.relValue}
      blockKey={props.block.getKey()}
      itemOverlayElement={renderMobileNativeLoader}
    />
  );
}

GalleryComponent.propTypes = {
  componentData: PropTypes.object.isRequired,
  componentState: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired,
  commonPubsub: PropTypes.object,
  blockProps: PropTypes.object.isRequired,
  block: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
  settings: PropTypes.object,
  helpers: PropTypes.object.isRequired,
  disableRightClick: PropTypes.bool,
  theme: PropTypes.object.isRequired,
  isMobile: PropTypes.bool.isRequired,
  anchorTarget: PropTypes.string.isRequired,
  relValue: PropTypes.string.isRequired,
  handleUploadStart: PropTypes.func.isRequired,
  handleUploadFinished: PropTypes.func.isRequired,
};

export { GalleryComponent as Component, DEFAULTS };
