import classNames from 'classnames';
import editorStyles from '../../statics/styles/rich-content-editor.scss';
import alignmentStyles from '../../statics/styles/rich-content-editor-alignment.rtlignore.scss';

const styles = { ...editorStyles, ...alignmentStyles };
const types = {
  blockquote: 'quote',
  'header-one': 'headerOne',
  'header-two': 'headerTwo',
  'header-three': 'headerThree',
  indent: 'indent',
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
