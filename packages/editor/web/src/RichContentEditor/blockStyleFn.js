import classNames from 'classnames';
import editorStyles from '../../statics/styles/rich-content-editor.scss';
import alignmentStyles from '../../statics/styles/rich-content-editor-alignment.rtlignore.scss';
import {
  depthClassName,
  getTextDirection,
  getDirectionFromAlignmentAndTextDirection,
} from 'wix-rich-content-common';

const styles = { ...editorStyles, ...alignmentStyles };
const types = {
  blockquote: 'quote',
  'header-one': 'headerOne',
  'header-two': 'headerTwo',
  'header-three': 'headerThree',
  'header-four': 'headerFour',
  'header-five': 'headerFive',
  'header-six': 'headerSix',
  atomic: 'atomic',
  'code-block': 'codeBlock',
};
const isList = type => {
  return type === 'ordered-list-item' || type === 'unordered-list-item';
};

const listAlignmentClass = (textAlignment, textDirection) => {
  const direction = getDirectionFromAlignmentAndTextDirection(textAlignment, textDirection);
  return `public-DraftStyleDefault-list-${direction}`;
};

const textBlockAlignmentClass = (textAlignment, textDirection) => {
  const direction = getDirectionFromAlignmentAndTextDirection(textAlignment, textDirection);
  return `public-DraftStyleDefault-text-${direction}`;
};

export default (theme, styleToClass) => {
  return contentBlock => {
    const {
      type,
      depth,
      text,
      data: { textAlignment, dynamicStyles = {} },
    } = contentBlock.toJS();

    const key = types[type] || 'text';

    const classList = [styles[key], theme[key]];

    if (type !== 'atomic') {
      classList.push(
        styles[textAlignment],
        theme[textAlignment],
        isList(type)
          ? listAlignmentClass(textAlignment, getTextDirection(text))
          : [depthClassName(depth), textBlockAlignmentClass(textAlignment, getTextDirection(text))]
      );
    }

    const dynamicClasses = Object.entries(dynamicStyles).map(styleToClass);

    return classNames(...classList, ...dynamicClasses);
  };
};
