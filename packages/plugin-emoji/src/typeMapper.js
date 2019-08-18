import { EMOJI_TYPE } from './constants';
import { containerClassName } from './classNameStrategies';
import EmojiViewer from './components/emoji-component';

export const typeMapper = () => ({
  [EMOJI_TYPE]: {
    component: EmojiViewer,
    classNameStrategies: { container: containerClassName },
  },
});
