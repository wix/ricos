import React from 'react';
import PropTypes from 'prop-types';
import VideoSelectionInputModal from './videoSelectionInputModal';
import MediaURLInputModal from './mediaURLInputModal';
import { meidaTypes } from '../types';
import { createBaseMediaPlugin } from 'wix-rich-content-plugin-commons';
import { VIDEO_TYPE } from 'wix-rich-content-common';

const VideoModal = props => {
  const {
    componentData: { type },
  } = props;
  const Comp = meidaTypes.includes(type)
    ? MediaURLInputModal
    : createBaseMediaPlugin({
        PluginComponent: VideoSelectionInputModal,
        pluginType: VIDEO_TYPE,
        isPluginViewer: false,
      });
  return <Comp {...props} />;
};

export default VideoModal;

VideoModal.propTypes = {
  componentData: PropTypes.object,
};
