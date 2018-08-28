import styles from '../statics/styles/sound-cloud-viewer.scss';
import { mergeStyles } from 'wix-rich-content-common';

export const containerClassName = theme => {
  const mergedStyles = mergeStyles({ styles, theme });
  return mergedStyles.soundCloud_container;
};
