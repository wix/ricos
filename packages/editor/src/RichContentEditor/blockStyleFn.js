import classNames from 'classnames';
import styles from '../../statics/styles/rich-content-editor.scss';

export default theme => contentBlock => {
  const {
    type,
    data: { textAlignment },
  } = contentBlock.toJS();
  const classList = [];

  switch (type) {
    case 'blockquote':
      classList.push(styles.quote);
      classList.push(theme.quote);
      break;
    case 'header-one':
      classList.push(styles.headerOne);
      classList.push(theme.headerOne);
      break;
    case 'header-two':
      classList.push(styles.headerTwo);
      classList.push(theme.headerTwo);
      break;
    case 'header-three':
      classList.push(styles.headerThree);
      classList.push(theme.headerThree);
      break;
    case 'indent':
      classList.push(styles.indent);
      classList.push(theme.indent);
      break;
    case 'ordered-list-item':
      classList.push(styles.orderedList);
      classList.push(theme.orderedList);
      break;
    case 'unordered-list-item':
      classList.push(styles.unorderedList);
      classList.push(theme.unorderedList);
      break;
    case 'atomic':
      classList.push(styles.atomic);
      classList.push(theme.atomic);
      break;
    case 'code-block':
      classList.push(styles.codeBlock);
      classList.push(theme.codeBlock);
      break;
    default:
      classList.push(styles.text);
      classList.push(theme.text);
  }
  if (type !== 'atomic') {
    classList.push(styles[textAlignment]);
    classList.push(theme[textAlignment]);
  }
  return classNames(...classList);
};
