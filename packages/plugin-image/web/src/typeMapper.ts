import ImageViewer from './image-viewer';
import { IMAGE_TYPE, IMAGE_TYPE_LEGACY } from './types';
import { sizeClassName, alignmentClassName } from './classNameStrategies';
import { PluginTypeMapper } from 'wix-rich-content-common';

const imageRenderDescriptor = {
  component: ImageViewer,
  classNameStrategies: {
    size: sizeClassName,
    alignment: alignmentClassName,
  },
};

export const typeMapper: PluginTypeMapper = () => ({
  [IMAGE_TYPE_LEGACY]: imageRenderDescriptor,
  [IMAGE_TYPE]: imageRenderDescriptor,
});
