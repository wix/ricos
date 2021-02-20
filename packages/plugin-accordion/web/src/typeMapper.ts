import AccordionViewer from './accordion-viewer';
import { ACCORDION_TYPE } from './types';
import { PluginTypeMapper } from 'wix-rich-content-common';

export const typeMapper: PluginTypeMapper = () => ({
  [ACCORDION_TYPE]: { component: AccordionViewer },
});
