import React from 'react';
import Fullscreen from 'wix-rich-content-fullscreen';
import { DraftContent } from '../../index';

interface Props {
  initialState: DraftContent;
  isOpen: boolean;
  index: number;
  images: Record<string, unknown>[];
  onClose: () => void;
  dataHook: string;
  isMobile: boolean;
  backgroundColor: string;
  foregroundColor: string;
}

const ViewerModal: React.FC<Props> = ({
  index,
  isOpen,
  images,
  onClose,
  isMobile,
  backgroundColor,
  foregroundColor,
}) => {
  return (
    <Fullscreen
      isOpen={isOpen}
      images={images}
      onClose={onClose}
      isMobile={isMobile}
      index={index}
      backgroundColor={backgroundColor}
      foregroundColor={foregroundColor}
    />
  );
};

export default ViewerModal;
