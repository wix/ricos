import React from 'react';

import { RichContentEditor } from 'wix-rich-content-editor';
import { createEmojiPlugin } from 'wix-rich-content-plugin-emoji';
import { createLinkPlugin } from 'wix-rich-content-plugin-link';
import { createLineSpacingPlugin } from 'wix-rich-content-plugin-line-spacing';
import { createHashtagPlugin } from 'wix-rich-content-plugin-hashtag';
import { createImagePlugin } from 'wix-rich-content-plugin-image';
import { createUndoRedoPlugin } from 'wix-rich-content-plugin-undo-redo';
import { createVideoPlugin } from 'wix-rich-content-plugin-video';
import { createHtmlPlugin } from 'wix-rich-content-plugin-html';
import { createDividerPlugin } from 'wix-rich-content-plugin-divider';
import { createCodeBlockPlugin } from 'wix-rich-content-plugin-code-block';

export const editorPlugins = [
  createImagePlugin,
  createVideoPlugin,
  createHtmlPlugin,
  createDividerPlugin,
  createLineSpacingPlugin,
  createLinkPlugin,
  createHashtagPlugin,
  createCodeBlockPlugin,
  createEmojiPlugin,
  createUndoRedoPlugin,
];

export default () => {
  return <RichContentEditor plugins={[editorPlugins]} />;
};
