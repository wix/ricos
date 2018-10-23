import styles from '../statics/styles/button-viewer.scss';
import { mergeStyles } from 'wix-rich-content-common';

export const containerClassName = theme => {
  const mergedStyles = mergeStyles({ styles, theme });
  return mergedStyles.button_container;
};
