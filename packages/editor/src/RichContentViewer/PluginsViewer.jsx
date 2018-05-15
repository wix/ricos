import React from 'react';
import PropTypes from 'prop-types';
// import { ImageViewer, IMAGE_TYPE_LEGACY, IMAGE_TYPE } from 'wix-rich-content-plugin-image';
// import { VideoComponent, VIDEO_TYPE_LEGACY, VIDEO_TYPE } from 'wix-rich-content-plugin-video';
// import * as Html from '../Plugins/wix-draft-plugin-html/html-component';
// import { HTML_TYPE } from '../Plugins/wix-draft-plugin-html/types';
// import * as Divider from '../Plugins/wix-draft-plugin-divider/divider-component';
// import { DIVIDER_TYPE } from '../Plugins/wix-draft-plugin-divider/types';
// import { GalleryViewer } from '../Plugins/wix-draft-plugin-gallery/gallery-viewer';
// import { GALLERY_TYPE } from '../Plugins/wix-draft-plugin-gallery/types';

const typeMap = {
  // [IMAGE_TYPE_LEGACY]: ImageViewer,
  // [IMAGE_TYPE]: ImageViewer,
  // [VIDEO_TYPE]: VideoComponent,
  // [VIDEO_TYPE_LEGACY]: VideoComponent,
  // [HTML_TYPE]: Html.Component,
  // [DIVIDER_TYPE]: Divider.Component,
  // [GALLERY_TYPE]: GalleryViewer,
};


const AtomicBlock = ({ type, componentData, ...props }) => {
  const Component = typeMap[type];
  if (Component) {
    return <Component theme={{}} componentData={componentData} {...props} />;
  }
  return null;
};

AtomicBlock.propTypes = {
  type: PropTypes.string.isRequired,
  componentData: PropTypes.object.isRequired,
};

//return a list of types with a function that wraps the viewer
const getPluginsViewer = () => {
  const res = {};
  Object.keys(typeMap).forEach(type => {
    res[type] = (children, entity, { key }) => <AtomicBlock type={type} key={key} componentData={entity}/>;
  });
  return res;
};

export default getPluginsViewer;
