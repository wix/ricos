/* eslint-disable import/no-unresolved */
import React from 'react';
import { RicosEditor } from 'ricos/editor';
import { pluginDivider } from 'ricos/divider';
import { pluginLinkButton, pluginActionButton } from 'ricos/button';
import { pluginCodeBlock } from 'ricos/code-block';
import { pluginEmoji } from 'ricos/emoji';
import { pluginGallery } from 'ricos/gallery';
import { pluginHashtag } from 'ricos/hashtag';
import { pluginHeadersMarkdown } from 'ricos/headers-markdown';
// import { pluginHtml } from 'ricos/html';
import { pluginImage } from 'ricos/image';
import { pluginLineSpacing } from 'ricos/line-spacing';
import { pluginLink } from 'ricos/link';
import { pluginLinkPreview, LinkPreviewProviders } from 'ricos/link-preview';
import { pluginMentions } from 'ricos/mentions';
import { pluginSoundCloud } from 'ricos/sound-cloud';
import { pluginUndoRedo } from 'ricos/undo-redo';
import { pluginVideo } from 'ricos/video';
import { pluginGiphy } from 'ricos/giphy';
import { TOOLBARS, DISPLAY_MODE } from 'ricos/editor-common';

const configs = {
  giphy: {
    giphySdkApiKey: 'HXSsAGVNzjeUjhKfhhD9noF8sIbpYDsV',
    sizes: { desktop: 'original', mobile: 'original' }, // original or downsizedSmall are supported
  },
};
const { Instagram, Twitter, YouTube, TikTok } = LinkPreviewProviders;
const plugins = [
  pluginLinkButton(),
  pluginActionButton(),
  pluginCodeBlock(),
  pluginDivider(),
  pluginGallery({ scrollingElement: () => window }),
  pluginHashtag(),
  // pluginHtml(),
  pluginImage(),
  pluginHeadersMarkdown(),
  pluginLineSpacing(),
  pluginLink(),
  pluginMentions(),
  pluginSoundCloud(),
  pluginVideo(),
  pluginUndoRedo(),
  pluginEmoji(),
  pluginLinkPreview({
    exposeEmbedButtons: [Instagram, Twitter, YouTube, TikTok],
    enableEmbed: true,
  }),
  pluginGiphy(configs.giphy),
];

export default () => {
  const toolbarSettings = {
    getToolbarSettings: ({ pluginButtons, textButtons }) => {
      return [
        {
          name: TOOLBARS.FOOTER,
          getVisibilityFn: () => ({
            desktop: () => true,
            mobile: {
              ios: () => true,
              android: () => true,
            },
          }),
          shouldCreate: () => ({
            desktop: true,
            mobile: {
              ios: true,
              android: true,
            },
          }),
          getPositionOffset: () => ({
            desktop: { x: 0, y: 1 },
            mobile: {
              ios: { x: 0, y: 1 },
              android: { x: 0, y: 1 },
            },
          }),
          getDisplayOptions: () => ({
            desktop: { displayMode: DISPLAY_MODE.FLOATING },
            mobile: {
              ios: { displayMode: DISPLAY_MODE.FLOATING },
              android: { displayMode: DISPLAY_MODE.FLOATING },
            },
          }),
          getButtons: () => {
            const buttons = pluginButtons
              .filter(({ buttonSettings: { toolbars } }) => toolbars.includes(TOOLBARS.FOOTER))
              .map(({ component }) => component);
            return {
              desktop: buttons,
              mobile: {
                ios: buttons,
                android: buttons,
              },
            };
          },
        },
        {
          name: TOOLBARS.SIDE,
          getVisibilityFn: () => ({
            desktop: () => false,
            mobile: {
              ios: () => false,
              android: () => false,
            },
          }),
        },
        {
          name: TOOLBARS.MOBILE,
          getVisibilityFn: () => ({
            desktop: () => false,
            mobile: {
              ios: () => false,
              android: () => false,
            },
          }),
        },
        {
          name: TOOLBARS.INLINE,
          getVisibilityFn: () => ({
            desktop: () => false,
            mobile: {
              ios: () => false,
              android: () => false,
            },
          }),
        },
      ];
    },
  };

  const ricosProps = {
    plugins,
    locale: 'en',
    toolbarSettings,
    // biSettings: { consumer: 'RCE Standalone' },
    // instance: mockInstance,
  };

  return <RicosEditor {...ricosProps} />;
};
