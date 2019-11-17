import classnames from 'classnames';
import { upperFirst } from 'lodash';
import { mergeStyles } from 'wix-rich-content-common';
import styles from '../statics/styles/default-styles.scss';
import alignmentStyles from '../statics/styles/alignment.rtlignore.scss';

export const containerClassName = theme => {
  const mergedStyles = mergeStyles({ styles, theme });
  return mergedStyles.button_container;
};

export const alignmentClassName = (componentData, theme, styles) => {
  const { alignment = 'center' } = componentData.config || {};
  const mergedStyles = mergeStyles({ styles: alignmentStyles, theme });
  return classnames(
    mergedStyles[`button_align_${alignment}`],
    styles[`align${upperFirst(alignment)}`],
    theme[`align${upperFirst(alignment)}`]
  );
};
