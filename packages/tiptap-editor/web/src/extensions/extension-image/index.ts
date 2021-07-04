import { createNodeExtension } from '../../extension';
import Image from './image';
import { ImageData } from 'ricos-schema';
export const createImage = () => {
  const attrs = ImageData.fromJSON({});
  return createNodeExtension('image', Image, attrs);
};
