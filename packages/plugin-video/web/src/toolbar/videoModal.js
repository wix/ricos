import React from 'react';
import PropTypes from 'prop-types';
import VideoSelectionInputModal from './videoSelectionInputModal';
import MediaURLInputModal from './mediaURLInputModal';
import { meidaTypes } from '../types';

const VideoModal = props => {
  const {
    componentData: { type },
  } = props;
  const Comp = meidaTypes.includes(type) ? MediaURLInputModal : VideoSelectionInputModal;
  return <Comp {...props} />;
};

export default VideoModal;

VideoModal.propTypes = {
  componentData: PropTypes.object,
};
