import { PollViewer } from './components/PollViewer';
import { POLL_TYPE } from './types';

export const typeMapper = () => ({
  [POLL_TYPE]: {
    component: PollViewer,
  },
});
