import classnames from 'classnames';
import { upperFirst } from 'lodash';
import { mergeStyles, ClassNameStrategy } from 'wix-rich-content-common';
import alignmentStyles from '../statics/styles/alignment.rtlignore.scss';
import styles from '../statics/styles/default-styles.scss';

export const alignmentClassName: ClassNameStrategy = (componentData, theme, styles) => {
  const { alignment = 'center' } = componentData.config || {};
  const mergedStyles = mergeStyles({ styles: alignmentStyles, theme });
  return classnames(
    mergedStyles[`button_align_${alignment}`],
    styles[`align${upperFirst(alignment)}`],
    theme[`align${upperFirst(alignment)}`]
  );
};

export const sizeClassName: ClassNameStrategy = (componentData, theme) => {
  const mergedStyles = mergeStyles({ styles, theme });
  return mergedStyles.button_size_content;
};
