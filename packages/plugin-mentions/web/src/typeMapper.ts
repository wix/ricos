import { MENTION_TYPE } from './types';
import MentionViewer from './MentionViewer';

export const typeMapper: PluginTypeMapper = () => ({
  [MENTION_TYPE]: {
    component: MentionViewer,
    elementType: 'inline',
  },
});

export default typeMapper;
