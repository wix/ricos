import classNames from 'classnames';
import styles from '../../statics/styles/rich-content-editor.scss';

const types = {
  blockquote: 'quote',
  'header-one': 'headerOne',
  'header-two': 'headerTwo',
  'header-three': 'headerThree',
  indent: 'indent',
  'ordered-list-item': 'orderedList',
  'unordered-list-item': 'unorderedList',
  atomic: 'atomic',
  'code-block': 'codeBlock',
};

export default (theme, styleToClass) => {
  return contentBlock => {
    const {
      type,
      data: { textAlignment, dynamicStyles = {} },
    } = contentBlock.toJS();

    const key = types[type] || 'text';

    const classList = [styles[key], theme[key]];

    if (type !== 'atomic') {
      classList.push(styles[textAlignment], theme[textAlignment]);
    }

    const dynamicClasses = Object.entries(dynamicStyles).map(styleToClass);

    return classNames(...classList, ...dynamicClasses);
  };
};
