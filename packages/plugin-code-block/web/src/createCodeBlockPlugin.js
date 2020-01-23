import CodeUtils from 'draft-js-code';
import { createBasePlugin } from 'wix-rich-content-editor-common';
import { CODE_BLOCK_TYPE } from './types';
// import PrismDecorator from './PrismDecorator';
import createCodeBlockToolbar from './toolbar/createCodeBlockToolbar';

const createUnderlyingPlugin = (/*{ theme }*/) => ({
  keyBindingFn: (event, { getEditorState }) => {
    const editorState = getEditorState();
    if (CodeUtils.hasSelectionInBlock(editorState)) {
      if (event.key === 'Tab' && event.shiftKey) {
        // since backspace removes tabs in CodeUtils
        // https://github.com/SamyPesse/draft-js-code/blob/9783c0f6bbedda6b7089712f9c657a72fdae636d/lib/handleKeyCommand.js#L11
        return 'backspace';
      } else {
        return CodeUtils.getKeyBinding(event);
      }
    }
  },

  handleKeyCommand: (command, editorState, timestamp, { setEditorState }) => {
    if (CodeUtils.hasSelectionInBlock(editorState)) {
      let newState;
      if (command === 'tab') {
        const mockEvent = { preventDefault: () => {} };
        newState = CodeUtils.onTab(mockEvent, editorState);
      } else {
        newState = CodeUtils.handleKeyCommand(editorState, command);
      }
      if (newState) {
        setEditorState(newState);
        return 'handled';
      }
    }
    return 'not-handled';
  },

  handleReturn: (event, editorState, { setEditorState }) => {
    if (CodeUtils.hasSelectionInBlock(editorState)) {
      setEditorState(CodeUtils.handleReturn(event, editorState));
      return 'handled';
    }
    return 'not-handled';
  },

  // decorators: [new PrismDecorator(theme)],
});

const createCodeBlockPlugin = (config = {}) => {
  const type = CODE_BLOCK_TYPE;
  const icon = config?.['code-block']?.toolbar?.icons?.InsertPluginButtonIcon;
  const {
    helpers,
    theme,
    isMobile,
    t,
    anchorTarget,
    relValue,
    getEditorState,
    setEditorState,
    [type]: settings = {},
    ...rest
  } = config;

  const plugin = createUnderlyingPlugin({ theme });
  const toolbar = createCodeBlockToolbar({
    helpers,
    theme,
    isMobile,
    t,
    anchorTarget,
    relValue,
    getEditorState,
    setEditorState,
    icon,
  });

  return createBasePlugin(
    {
      theme,
      toolbar,
      type,
      helpers,
      isMobile,
      anchorTarget,
      relValue,
      t,
      settings,
      ...rest,
    },
    plugin
  );
};

export { createCodeBlockPlugin };
