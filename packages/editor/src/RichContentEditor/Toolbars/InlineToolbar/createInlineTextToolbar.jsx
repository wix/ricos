import createInlineToolbar from './createInlineToolbar';
import { getTextButtonsFromList } from '../buttons/utils';

export default config => {
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
  } = config;

  const structure = getTextButtonsFromList({
    buttons,
    textPluginButtons,
    pubsub,
    theme,
    t,
    uiSettings,
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
  });
};
