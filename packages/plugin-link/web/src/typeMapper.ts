import { EXTERNAL_LINK_TYPE, LINK_TYPE } from './types';
import LinkViewer from './LinkViewer';
import { PluginTypeMapper } from 'wix-rich-content-common';

export const typeMapper: PluginTypeMapper = () => ({
  [EXTERNAL_LINK_TYPE]: { component: LinkViewer, elementType: 'inline' },
  [LINK_TYPE]: { component: LinkViewer, elementType: 'inline' },
});
