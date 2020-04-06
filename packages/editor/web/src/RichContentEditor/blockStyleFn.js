import classNames from 'classnames';
import editorStyles from '../../statics/styles/rich-content-editor.scss';
import alignmentStyles from '../../statics/styles/rich-content-editor-alignment.rtlignore.scss';

const styles = { ...editorStyles, ...alignmentStyles };
const types = {
  blockquote: 'quote',
  'header-one': 'headerOne',
  'header-two': 'headerTwo',
  'header-three': 'headerThree',
  'header-four': 'headerFour',
  'header-five': 'headerFive',
  'header-six': 'headerSix',
  indent: 'indent',
  atomic: 'atomic',
  'code-block': 'codeBlock',
  'ordered-list-item': 'orderedList',
  'unordered-list-item': 'unorderedList',
};
const isList = type => {
  return type === 'ordered-list-item' || type === 'unordered-list-item';
};

export default (theme, styleToClass) => {
  return contentBlock => {
    const {
      type,
      depth,
      data: { textAlignment, dynamicStyles = {} },
    } = contentBlock.toJS();
    let depthClassName;
    const key = types[type] || 'text';

    if (!isList(type)) {
      depthClassName = `public-DraftStyleDefault-block-depth${depth}`;
    }
    const classList = [styles[key], theme[key]];

    if (type !== 'atomic') {
      classList.push(styles[textAlignment], theme[textAlignment], depthClassName);
    }

    const dynamicClasses = Object.entries(dynamicStyles).map(styleToClass);

    return classNames(...classList, ...dynamicClasses);
  };
};
