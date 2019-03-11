import { MENTION_TYPE } from './types';
import MentionViewer from './MentionViewer';

export default () => ({
  [MENTION_TYPE]: {
    component: MentionViewer,
    elementType: 'inline',
  },
});
