import createInlineButtons from './inline-buttons';

export default function createToolbar(settings, setEditorState, getEditorState) {
  return {
    InlineButtons: createInlineButtons(setEditorState, getEditorState),
    name: 'link-preview',
  };
}
