import CodeUtils from 'draft-js-code';
import { createBasePlugin } from 'wix-rich-content-plugin-commons';
import { COMMANDS, EditorState } from 'wix-rich-content-editor-common';
import { CODE_BLOCK_TYPE } from './types';
// import PrismDecorator from './PrismDecorator';
import createCodeBlockToolbar from './toolbar/createToolbar';
import { CreatePluginFunction, UnderlyingPlugin } from 'wix-rich-content-common';
import { DEFAULTS } from './defaults';

const handleShiftTab = (editorState: EditorState) => {
  // since backspace removes tabs in CodeUtils
  // https://github.com/SamyPesse/draft-js-code/blob/9783c0f6bbedda6b7089712f9c657a72fdae636d/lib/handleKeyCommand.js#L11
  return CodeUtils.handleKeyCommand(editorState, 'backspace');
};

const createUnderlyingPlugin = (/*{ theme }*/): UnderlyingPlugin => ({
  handleKeyCommand: (command, editorState, timestamp, { setEditorState }) => {
    if (CodeUtils.hasSelectionInBlock(editorState)) {
      let newState;
      if (command === COMMANDS.TAB) {
        const mockEvent = { preventDefault: () => {} };
        newState = CodeUtils.onTab(mockEvent, editorState);
      } else if (command === COMMANDS.SHIFT_TAB) {
        newState = handleShiftTab(editorState);
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

const createCodeBlockPlugin: CreatePluginFunction = config => {
  const type = CODE_BLOCK_TYPE;
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

  const plugin = createUnderlyingPlugin(/*{ theme }*/);
  const toolbar = createCodeBlockToolbar(config);

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
      getEditorState,
      setEditorState,
      defaultPluginData: DEFAULTS,
      ...rest,
    },
    plugin
  );
};

export { createCodeBlockPlugin };
