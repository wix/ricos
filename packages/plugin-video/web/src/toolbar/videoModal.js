import React from 'react';
import PropTypes from 'prop-types';
import VideoSelectionInputModal from './videoSelectionInputModal';
import SoundCloudURLInputModal from './soundCloudURLInputModal';

const VideoModal = props => {
  const Comp =
    props.componentData.type === 'soundCloud' ? SoundCloudURLInputModal : VideoSelectionInputModal;
  return <Comp {...props} />;
};

export default VideoModal;

VideoModal.propTypes = {
  componentData: PropTypes.object,
};
