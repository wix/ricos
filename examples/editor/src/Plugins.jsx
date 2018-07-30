import { createLinkPlugin } from 'wix-rich-content-plugin-link';
import { createHashtagPlugin } from 'wix-rich-content-plugin-hashtag';
import { createExternalEmojiPlugin } from 'wix-rich-content-plugin-emoji';
import { createImagePlugin } from 'wix-rich-content-plugin-image';
import { createVideoPlugin } from 'wix-rich-content-plugin-video';
import { createGalleryPlugin } from 'wix-rich-content-plugin-gallery';
import { createHtmlPlugin } from 'wix-rich-content-plugin-html';
import { createDividerPlugin } from 'wix-rich-content-plugin-divider';
import { createExternalMentionsPlugin } from 'wix-rich-content-plugin-mentions';

const plugins = [
  createImagePlugin,
  createGalleryPlugin,
  createVideoPlugin,
  createHtmlPlugin,
  createDividerPlugin,
  createExternalEmojiPlugin,
  createLinkPlugin,
  createHashtagPlugin,
  createExternalMentionsPlugin,
];

export default plugins;
