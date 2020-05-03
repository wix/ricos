import React from 'react';
import getImagesData from 'wix-rich-content-fullscreen/dist/lib/getImagesData.cjs.js';
import Fullscreen from 'wix-rich-content-fullscreen';

interface Props {
  initialState: ContentState;
  setExpandModeData: (data: any) => any;
  isOpen: boolean;
  index: number;
  images: object[];
  onClose: () => void;
}

export default class ViewerModal extends React.Component<Props> {
  constructor(props) {
    super(props);
    props.setExpandModeData(getImagesData(props.initialState));
    this.state = {
      disabled: false,
    };
  }

  componentDidUpdate(prevProps) {
    const { initialState } = this.props;
    if (prevProps.initialState !== initialState) {
      this.props.setExpandModeData(getImagesData(initialState));
    }
  }

  render() {
    const { index, isOpen, images, onClose } = this.props;
    return <Fullscreen isOpen={isOpen} images={images} onClose={onClose} index={index} />;
  }
}
