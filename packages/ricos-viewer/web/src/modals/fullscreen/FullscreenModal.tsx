import React, { Component } from 'react';
import getImagesData from 'wix-rich-content-fullscreen/dist/lib/getImagesData.cjs.js';
import Fullscreen from 'wix-rich-content-fullscreen';
import { ExpandModeData } from './FullscreenProvider';
import { RicosContent } from '../../index';

interface Props {
  initialState: RicosContent;
  setExpandModeData: (data: ExpandModeData) => void;
  isOpen: boolean;
  index: number;
  images: Record<string, unknown>[];
  onClose: () => void;
  dataHook: string;
  isMobile: boolean;
}

export default class ViewerModal extends Component<Props> {
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
    const { index, isOpen, images, onClose, isMobile } = this.props;
    return (
      <Fullscreen
        isOpen={isOpen}
        images={images}
        onClose={onClose}
        isMobile={isMobile}
        index={index}
      />
    );
  }
}
