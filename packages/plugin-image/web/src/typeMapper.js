import ImageViewer from './image-viewer';
import { sizeClassName, alignmentClassName } from './classNameStrategies';

const imageRenderDescriptor = {
  component: ImageViewer,
  classNameStrategies: {
    size: sizeClassName,
    alignment: alignmentClassName,
  },
};

export const typeMapper = () => ({
  IMAGE: imageRenderDescriptor,
  'wix-draft-plugin-image': imageRenderDescriptor,
});
