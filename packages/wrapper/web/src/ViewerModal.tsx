import React from 'react';
import getImagesData from 'wix-rich-content-fullscreen/dist/lib/getImagesData.cjs.js';
import Fullscreen from 'wix-rich-content-fullscreen';
import { InitialState } from './RichContentWrapperTypes';

interface Props {
  initialState: InitialState;
  setExpandModeData: (data: any) => any;

  isOpen: boolean;
  index: number;
  images: object[];
  onClose: () => void;
}

export default class ViewerModal extends React.Component<Props> {
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
