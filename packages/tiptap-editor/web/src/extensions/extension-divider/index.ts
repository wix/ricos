import { createNodeExtension } from '../../extension';
import Divider from './divider';
import { DEFAULTS, createDividerData } from 'wix-rich-content-plugin-divider';

export const createDivider = () => {
  return createNodeExtension('divider', Divider, createDividerData(DEFAULTS));
};
