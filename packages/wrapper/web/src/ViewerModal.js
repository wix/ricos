import React from 'react';
import PropTypes from 'prop-types';
import getImagesData from 'wix-rich-content-fullscreen/dist/lib/getImagesData.cjs.js';
import Fullscreen from 'wix-rich-content-fullscreen';
import './viewermodal.global.css';

export default class ViewerModal extends React.Component {
  constructor(props) {
    super(props);
    this.props.setExpandModeData(getImagesData(this.props.initialState));
    this.state = {
      disabled: false,
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.initialState !== this.props.initialState) {
      this.props.setExpandModeData(getImagesData(this.props.initialState));
    }
  }

  render() {
    const { index, isOpen, images, onClose } = this.props;
    return <Fullscreen isOpen={isOpen} images={images} onClose={onClose} index={index} />;
  }
}

ViewerModal.propTypes = {
  initialState: PropTypes.any,
  setExpandModeData: PropTypes.any.isRequired,
  isOpen: PropTypes.bool,
  index: PropTypes.number,
  images: PropTypes.array,
  onClose: PropTypes.func,
};
