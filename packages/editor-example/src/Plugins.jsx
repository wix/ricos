import { createLinkPlugin } from 'wix-rich-content-plugin-link';
import { createHashtagPlugin } from 'wix-rich-content-plugin-hashtag';
//import { createExternalEmojiPlugin } from 'wix-rich-content-plugin-emoji';
import { createImagePlugin } from 'wix-rich-content-plugin-image';
import { createVideoPlugin } from 'wix-rich-content-plugin-video';
import { createGalleryPlugin } from 'wix-rich-content-plugin-gallery';
import { createHtmlPlugin } from 'wix-rich-content-plugin-html';
import { createDividerPlugin } from 'wix-rich-content-plugin-divider';

import 'wix-rich-content-plugin-link/dist/styles.css';
import 'wix-rich-content-plugin-hashtag/dist/styles.css';
import 'wix-rich-content-plugin-emoji/dist/styles.css';
import 'wix-rich-content-plugin-image/dist/styles.css';
import 'wix-rich-content-plugin-video/dist/styles.css';
import 'wix-rich-content-plugin-gallery/dist/styles.css';
import 'wix-rich-content-plugin-html/dist/styles.css';
import 'wix-rich-content-plugin-divider/dist/styles.css';

const plugins = [
  createImagePlugin,
  createGalleryPlugin,
  createVideoPlugin,
  createHtmlPlugin,
  createDividerPlugin,
  //createExternalEmojiPlugin
  createLinkPlugin,
  createHashtagPlugin,
];

export default plugins;
