import createToolbar from './toolbar';
import { Component, DEFAULTS } from './video-component';
import { VIDEO_TYPE, VIDEO_TYPE_LEGACY } from './types';
import { createBasePlugin } from 'wix-rich-content-editor-common';
import ReactPlayer from 'react-player';

const createVideoPlugin = (config = {}) => {
  const type = VIDEO_TYPE;
  const { helpers, t, [type]: settings = {}, isMobile, ...rest } = config;

  const selectedVideoData = (
    { url, pathname, thumbnail },
    componentData,
    isCustomVideo = false
  ) => {
    const src = pathname?.length ? { pathname, thumbnail } : url;
    if (ReactPlayer.canPlay(url) || isCustomVideo) {
      pubsubContainer.pubsub.update('componentData', { src, isCustomVideo });

      if (helpers && helpers.onVideoSelected) {
        helpers.onVideoSelected(src, data =>
          pubsubContainer.pubsub.update('componentData', { metadata: { ...data } })
        );
      }
    } else {
      //this.setState({ submitted: true });
    }
  };

  const onVideoUpdate = ({ data, error }, componentData, isCustomVideo = false) => {
    if (error) {
      //this.setState({ errorMsg: error.msg });
    } else {
      const videoData = data.pathname
        ? {
            url: '',
            pathname: data.pathname,
            thumbnail: data.thumbnail,
          }
        : { url: data.url, pathname: '' };
      selectedVideoData(videoData, componentData, isCustomVideo);
    }
  };

  const pubsubContainer = {};

  return createBasePlugin({
    component: Component,
    type: VIDEO_TYPE,
    legacyType: VIDEO_TYPE_LEGACY,
    toolbar: createToolbar({
      helpers,
      t,
      settings: { ...settings, onVideoUpdate },
      isMobile,
    }),
    helpers,
    settings,
    t,
    isMobile,
    disableRightClick: config?.uiSettings?.disableRightClick,
    defaultPluginData: DEFAULTS,
    ...rest,
    pubsubContainer,
  });
};

export { createVideoPlugin };
