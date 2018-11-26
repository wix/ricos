import { RichUtils } from '@wix/draft-js';

import { getSelectionStyles, HEADING } from 'wix-rich-content-common';
import createInlineStyleButton from './createInlineStyleButton';
import createInlineStyleDropDown from './createInlineStyleDropDown';
import styles from '../../../../../statics/styles/heading-buttons.scss';

const headings = [{
  style: HEADING.NORMAL,
  labelKey: 'NormalTextButton_label',
  tooltipTextKey: 'NorNormalTextButton_tooltip',
  className: styles.normalTextButton
}, {
  style: HEADING.ONE,
  labelKey: 'HeadingOneButton_label',
  tooltipTextKey: 'HeadingOneButton_tooltip',
  className: styles.headingOneButton
}, {
  style: HEADING.TWO,
  labelKey: 'HeadingTwoButton_label',
  tooltipTextKey: 'HeadingTwoButton_tooltip',
  className: styles.headingTwoButton
}, {
  style: HEADING.THREE,
  labelKey: 'HeadingThreeButton_label',
  tooltipTextKey: 'HeadingThreeButton_tooltip',
  className: styles.headingThreeButton
}];

const getSelectionStyle = ({ editorState, styles, defaultValue }) => {
  const selectionStyles = getSelectionStyles(styles, editorState);
  if (selectionStyles.length === 0) {
    return defaultValue;
  } else if (selectionStyles.length > 1) {
    return { style: '', labelKey: '' };
  }
  return styles.filter(s => s === selectionStyles[0])[0];
};

const HeadingsDropDown = createInlineStyleDropDown({
  buttons: headings.map(heading => createInlineStyleButton(heading)),
  activeItem: ({ getEditorState, value }) => {
    if (value) {
      return headings.filter(h => h.style === value)[0];
    }
    const style = getSelectionStyle({
      editorState: getEditorState(),
      styles: headings.map(h => h.style),
      defaultValue: headings[0].style });
    return style;
  },
  tooltipTextKey: 'TitleButton_tooltip',
  onChange: (getEditorState, setEditorState, style) => {
    let editorState = getEditorState();
    // toggle off all exclusive inline styles
    const selectionStyles = getSelectionStyles(headings.map(heading => heading.style), editorState);
    selectionStyles.forEach(appliedStyle => {
      editorState = RichUtils.toggleInlineStyle(editorState, appliedStyle);
    });
    // apply new style
    if (style !== HEADING.NORMAL) {
      editorState = RichUtils.toggleInlineStyle(editorState, style);
    }
    setEditorState(editorState);
  },
});

export default HeadingsDropDown;
