import styles from '../statics/styles/default-styles.scss';
import { mergeStyles } from 'wix-rich-content-common';

export const containerClassName = theme => {
  const mergedStyles = mergeStyles({ styles, theme });
  return mergedStyles.emoji_component_container;
};
