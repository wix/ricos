import styles from './video-viewer.scss';
import { mergeStyles } from 'wix-rich-content-common';

export const containerClassName = theme => {
  const mergedStyles = mergeStyles({ styles, theme });
  return mergedStyles.video_container;
};
