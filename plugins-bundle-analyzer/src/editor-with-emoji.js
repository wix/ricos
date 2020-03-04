import React from 'react';

import { RichContentEditor } from 'wix-rich-content-editor';
import { createEmojiPlugin } from 'wix-rich-content-plugin-emoji';

export default () => {
  return <RichContentEditor plugins={[createEmojiPlugin]} />;
};
