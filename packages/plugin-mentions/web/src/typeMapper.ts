import { MENTION_TYPE } from './types';
import MentionViewer from './MentionViewer';
import { PluginTypeMapper } from 'wix-rich-content-common';

export const typeMapper: PluginTypeMapper = () => ({
  [MENTION_TYPE]: {
    component: MentionViewer,
    elementType: 'inline',
  },
});

export default typeMapper;
