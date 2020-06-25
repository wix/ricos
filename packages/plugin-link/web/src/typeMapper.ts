import { EXTERNAL_LINK_TYPE, LINK_TYPE } from './types';
import LinkViewer from './LinkViewer';

export const typeMapper: PluginTypeMapper = () => ({
  [EXTERNAL_LINK_TYPE]: { component: LinkViewer, elementType: 'inline' },
  [LINK_TYPE]: { component: LinkViewer, elementType: 'inline' },
});
