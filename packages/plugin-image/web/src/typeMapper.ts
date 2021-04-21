// import ImageViewer from './image-viewer';
import { IMAGE_TYPE, IMAGE_TYPE_LEGACY } from './types';
import { sizeClassName, alignmentClassName } from './classNameStrategies';
import { PluginTypeMapper } from 'wix-rich-content-common';

const imageRenderDescriptor = {
  component: null,
  classNameStrategies: {
    size: sizeClassName,
    alignment: alignmentClassName,
  },
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
export const typeMapper: PluginTypeMapper = component => {
  imageRenderDescriptor.component = component;
  return {
    [IMAGE_TYPE_LEGACY]: {
      ...imageRenderDescriptor,
      component,
    },
    [IMAGE_TYPE]: {
      ...imageRenderDescriptor,
      component,
    },
  };
};

export const preTypeMapper = component => {
  return () => {
    return typeMapper(component);
  };
};
