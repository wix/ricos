import EmojiPreviewModal from './toolbar/emojiPreviewModal';

const Modals = {
  EMOJI_INPUT: 'emoji-input',
};

const ModalsMap = {
  [Modals.EMOJI_INPUT]: EmojiPreviewModal,
};

export { Modals, ModalsMap };
