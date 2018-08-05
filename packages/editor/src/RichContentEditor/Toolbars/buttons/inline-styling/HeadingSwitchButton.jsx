import { RichUtils } from '@wix/draft-js';
import { HEADING, getSelectionStyles } from 'wix-rich-content-common';
import createInlineStyleSwitchButton from './createInlineStyleSwitchButton';
import { TitleIcon, TitleOneIcon, TitleTwoIcon } from '../../../Icons';

const styles = Object.keys(HEADING).map(k => HEADING[k]).filter(style => style !== HEADING.TITLE);
const HeadingSwitchButton = createInlineStyleSwitchButton({
  Icons: [TitleIcon, TitleOneIcon, TitleTwoIcon],
  styles,
  onStyleChange: ({ getEditorState, setEditorState, styles, nextStyle }) => {
    let editorState = getEditorState();
    // toggle off all exclusive inline styles
    const selectionStyles = getSelectionStyles(styles, editorState);
    selectionStyles.forEach(appliedStyle => {
      editorState = RichUtils.toggleInlineStyle(editorState, appliedStyle);
    });
    // apply new style
    if (nextStyle !== HEADING.NORMAL) {
      editorState = RichUtils.toggleInlineStyle(editorState, nextStyle);
    }
    setEditorState(editorState);
  },
  getSelectionStyle: ({ editorState, styles }) => {
    const selection = editorState.getSelection();
    if (selection.getEndOffset() - selection.getStartOffset() > 0) {
      const selectionStyles = getSelectionStyles(styles, editorState);

      if (selectionStyles.length !== 1) {
        return HEADING.NORMAL;
      }
      return selectionStyles[0];
    }
  },
  tooltipTextKey: 'TitleButton_tooltip'
});

export default HeadingSwitchButton;
