import { RichUtils } from '@wix/draft-js';
import isSoftNewlineEvent from '@wix/draft-js/lib/isSoftNewlineEvent';

export default updateEditorState => (command, editorState) => {
  if (isSoftNewlineEvent(command)) {
    const newState = RichUtils.insertSoftNewline(editorState);
    updateEditorState(newState);
    return 'handled';
  }

  return 'not-handled';
};
