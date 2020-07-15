import styles from '../statics/styles/sound-cloud-viewer.scss';
import { mergeStyles, ContainerClassNameStrategy } from 'wix-rich-content-common';

export const containerClassName: ContainerClassNameStrategy = theme => {
  const mergedStyles = mergeStyles({ styles, theme });
  return mergedStyles.soundCloud_container;
};
