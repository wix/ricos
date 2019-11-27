import classnames from 'classnames';
import { upperFirst } from 'lodash';
import { mergeStyles } from 'wix-rich-content-editor-common';
import alignmentStyles from '../statics/styles/alignment.rtlignore.scss';
import styles from '../statics/styles/default-styles.scss';

export const alignmentClassName = (componentData, theme, styles) => {
  const { alignment = 'center' } = componentData.config || {};
  const mergedStyles = mergeStyles({ styles: alignmentStyles, theme });
  return classnames(
    mergedStyles[`button_align_${alignment}`],
    styles[`align${upperFirst(alignment)}`],
    theme[`align${upperFirst(alignment)}`]
  );
};

export const sizeClassName = (componentData, theme) => {
  const mergedStyles = mergeStyles({ styles, theme });
  return mergedStyles.button_size_content;
};
