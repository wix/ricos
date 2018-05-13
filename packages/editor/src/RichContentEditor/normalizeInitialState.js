import { normalizeInitialState } from 'wix-rich-content-common';

export default initialState => normalizeInitialState(initialState, {
  IMAGE: 'wix-draft-plugin-image',
  'VIDEO-EMBED': 'wix-draft-plugin-video'
});
