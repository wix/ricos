import { createNodeExtension } from '../../extension';
import Divider from './divider';
import { DividerData } from 'ricos-schema';
export const createDivider = () => {
  const attrs = { ...DividerData.fromJSON({}), key: '' };
  return createNodeExtension('divider', Divider, attrs);
};
