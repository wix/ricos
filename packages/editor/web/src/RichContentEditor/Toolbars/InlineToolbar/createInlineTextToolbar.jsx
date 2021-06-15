import createInlineToolbar from './createInlineToolbar';
import { getTextButtonsFromList } from '../buttons/utils';
import { ToolbarType } from 'wix-rich-content-common';

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
  });

  return createInlineToolbar({
    name: 'InlineTextToolbar',
    structure,
    defaultTextAlignment,
    pubsub,
    theme,
    isMobile,
    helpers: {
      ...helpers,
      onToolbarButtonClick: args =>
        helpers?.onToolbarButtonClick?.({ ...args, type: ToolbarType.FORMATTING }),
    },
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
