import createInlineToolbar from './createInlineToolbar';
import { getTextButtonsFromList } from '../buttons/utils';

export default data => {
  const {
    buttons,
    textPluginButtons,
    defaultTextAlignment,
    pubsub,
    theme,
    isMobile,
    helpers,
    anchorTarget,
    relValue,
    t,
    offset,
    visibilityFn,
    displayOptions,
    uiSettings,
    toolbarDecorationFn,
    config,
    locale,
    getEditorState,
    setEditorState,
  } = data;

  const structure = getTextButtonsFromList({
    buttons,
    textPluginButtons,
    pubsub,
    theme,
    t,
    uiSettings,
    config,
    isMobile,
    getEditorState,
    setEditorState,
  });

  return createInlineToolbar({
    name: 'InlineTextToolbar',
    structure,
    defaultTextAlignment,
    pubsub,
    theme,
    isMobile,
    helpers,
    anchorTarget,
    relValue,
    t,
    offset,
    visibilityFn,
    displayOptions,
    uiSettings,
    toolbarDecorationFn,
    locale,
  });
};
