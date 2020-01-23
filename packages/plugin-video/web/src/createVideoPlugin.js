import createToolbar from './toolbar';
import { Component, DEFAULTS } from './video-component';
import { VIDEO_TYPE, VIDEO_TYPE_LEGACY } from './types';
import { createBasePlugin } from 'wix-rich-content-editor-common';
import ReactPlayer from 'react-player';

const createVideoPlugin = (config = {}) => {
  const { helpers, t, [VIDEO_TYPE]: settings = {}, isMobile, ...rest } = config;

  const onVideoUpdate = ({ data }, componentData, isCustomVideo = false) => {
    const { pathname, thumbnail, url } = data;
    const src = pathname ? { pathname, thumbnail } : url;
    pubsub.update('componentData', { src, isCustomVideo });
    helpers.onVideoSelected(src, data => pubsub.update('componentData', { metadata: { ...data } }));
  };

  const onNativeVideoUpload = (file, componentData) => {
    settings.handleFileUpload(file, ({ data, error }) =>
      onVideoUpdate({ data, error }, componentData, true)
    );
  };

  const basePlugin = createBasePlugin({
    component: Component,
    type: VIDEO_TYPE,
    legacyType: VIDEO_TYPE_LEGACY,
    toolbar: createToolbar({
      helpers,
      t,
      settings: {
        ...settings,
        onVideoUpdate,
        onNativeVideoUpload,
        checkUrlValidity: ReactPlayer.canPlay,
      },
      isMobile,
    }),
    helpers,
    settings,
    t,
    isMobile,
    disableRightClick: config?.uiSettings?.disableRightClick,
    defaultPluginData: DEFAULTS,
    ...rest,
  });

  const { pubsub } = basePlugin;

  return basePlugin;
};

export { createVideoPlugin };
