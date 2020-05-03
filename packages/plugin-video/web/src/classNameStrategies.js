// @flow
import { mergeStyles } from 'wix-rich-content-common';
import styles from '../statics/styles/video-viewer.scss';

export const containerClassName /*: ClassNameStrategy*/ = theme => {
  const mergedStyles = mergeStyles({ styles, theme });
  return mergedStyles.video_container;
};
