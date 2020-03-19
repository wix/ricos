import CodeUtils from 'draft-js-code';
import { createBasePlugin, COMMANDS } from 'wix-rich-content-editor-common';
import { CODE_BLOCK_TYPE } from './types';
// import PrismDecorator from './PrismDecorator';
import createCodeBlockToolbar from './toolbar/createCodeBlockToolbar';

const createUnderlyingPlugin = (/*{ theme }*/) => ({
  handleKeyCommand: (command, editorState, timestamp, { setEditorState }) => {
    if (CodeUtils.hasSelectionInBlock(editorState)) {
      let newState;
      if (command === COMMANDS.TAB) {
        const mockEvent = { preventDefault: () => {} };
        newState = CodeUtils.onTab(mockEvent, editorState);
      } else if (command === COMMANDS.SHIFT_TAB) {
        newState = CodeUtils.handleKeyCommand(editorState, 'backspace');
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
