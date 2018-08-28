import { createLinkPlugin } from 'wix-rich-content-plugin-link';
import { createHashtagPlugin } from 'wix-rich-content-plugin-hashtag';
// import { createExternalEmojiPlugin } from 'wix-rich-content-plugin-emoji';
// import { createImagePlugin } from 'wix-rich-content-plugin-image';
import { createVideoPlugin } from 'wix-rich-content-plugin-video';
// import { createGalleryPlugin } from 'wix-rich-content-plugin-gallery';
import { createHtmlPlugin } from 'wix-rich-content-plugin-html';
import { createDividerPlugin } from 'wix-rich-content-plugin-divider';
import { createExternalMentionsPlugin } from 'wix-rich-content-plugin-mentions';
import { createCodeBlockPlugin } from 'wix-rich-content-plugin-code-block';
import { createSoundCloudPlugin } from 'wix-rich-content-plugin-sound-cloud';

import 'wix-rich-content-common/dist/styles.min.css';
import 'wix-rich-content-editor/dist/styles.min.css';
import 'wix-rich-content-plugin-code-block/dist/styles.min.css';
import 'wix-rich-content-plugin-divider/dist/styles.min.css';
// import 'wix-rich-content-plugin-emoji/dist/styles.min.css';
// import 'wix-rich-content-plugin-gallery/dist/styles.min.css';
import 'wix-rich-content-plugin-html/dist/styles.min.css';
import 'wix-rich-content-plugin-hashtag/dist/styles.min.css';
// import 'wix-rich-content-plugin-image/dist/styles.min.css';
import 'wix-rich-content-plugin-link/dist/styles.min.css';
import 'wix-rich-content-plugin-mentions/dist/styles.min.css';
import 'wix-rich-content-plugin-video/dist/styles.min.css';
import 'wix-rich-content-plugin-code-block/dist/styles.min.css';
import 'wix-rich-content-plugin-sound-cloud/dist/styles.min.css';

const plugins = [
  // createImagePlugin,
  // createGalleryPlugin,
  createVideoPlugin,
  createHtmlPlugin,
  createDividerPlugin,
  // createExternalEmojiPlugin,
  createLinkPlugin,
  createHashtagPlugin,
  createExternalMentionsPlugin,
  createCodeBlockPlugin,
  createSoundCloudPlugin
];

export default plugins;
