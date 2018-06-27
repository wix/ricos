import { createLinkPlugin } from 'wix-rich-content-plugin-link';
import { createHashtagPlugin } from 'wix-rich-content-plugin-hashtag';
import { createExternalEmojiPlugin } from 'wix-rich-content-plugin-emoji';
import { createImagePlugin } from 'wix-rich-content-plugin-image';
import { createVideoPlugin } from 'wix-rich-content-plugin-video';
import { createGalleryPlugin } from 'wix-rich-content-plugin-gallery';
import { createHtmlPlugin } from 'wix-rich-content-plugin-html';
import { createDividerPlugin } from 'wix-rich-content-plugin-divider';

import 'wix-rich-content-plugin-link/dist/wix-rich-content-plugin-link.css';
import 'wix-rich-content-plugin-hashtag/dist/wix-rich-content-plugin-hashtag.css';
import 'wix-rich-content-plugin-emoji/dist/wix-rich-content-plugin-emoji.css';
import 'wix-rich-content-plugin-image/dist/wix-rich-content-plugin-image.css';
import 'wix-rich-content-plugin-video/dist/wix-rich-content-plugin-video.css';
import 'wix-rich-content-plugin-gallery/dist/wix-rich-content-plugin-gallery.css';
import 'wix-rich-content-plugin-html/dist/wix-rich-content-plugin-html.css';
import 'wix-rich-content-plugin-divider/dist/wix-rich-content-plugin-divider.css';

const plugins = [
  createImagePlugin,
  createGalleryPlugin,
  createVideoPlugin,
  createHtmlPlugin,
  createDividerPlugin,
  createExternalEmojiPlugin,
  createLinkPlugin,
  createHashtagPlugin,
];

export default plugins;
