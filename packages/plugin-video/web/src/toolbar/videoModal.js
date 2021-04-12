import React from 'react';
import PropTypes from 'prop-types';
import VideoSelectionInputModal from './videoSelectionInputModal';
import MediaURLInputModal from './mediaURLInputModal';
import { videoButtonsTypes } from '../types';

const VideoModal = props => {
  const {
    componentData: { type },
  } = props;
  const { soundCloud, youTube } = videoButtonsTypes;
  const Comp =
    type === soundCloud || type === youTube ? MediaURLInputModal : VideoSelectionInputModal;
  return <Comp {...props} />;
};

export default VideoModal;

VideoModal.propTypes = {
  componentData: PropTypes.object,
};
