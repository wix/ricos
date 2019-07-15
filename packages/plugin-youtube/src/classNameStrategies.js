import styles from '../statics/styles/youtube-component.scss';
import { mergeStyles } from 'wix-rich-content-common';

export const containerClassName = theme => {
  const mergedStyles = mergeStyles({ styles, theme });
  return mergedStyles.youtube_component_video_container;
};
