import { UNSPLASH_TYPE } from './constants';
import { sizeClassName, alignmentClassName } from './classNameStrategies';
import UnsplashViewer from './components/unsplash-viewer';

const imageRenderDescriptor = {
  component: UnsplashViewer,
  classNameStrategies: {
    size: sizeClassName,
    alignment: alignmentClassName,
  },
};

export const typeMapper = () => ({
  [UNSPLASH_TYPE]: imageRenderDescriptor,
});
