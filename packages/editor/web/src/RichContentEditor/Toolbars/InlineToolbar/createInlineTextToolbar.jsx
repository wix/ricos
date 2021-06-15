import createInlineToolbar from './createInlineToolbar';
import { getTextButtonsFromList } from '../buttons/utils';
import { ToolbarType } from 'wix-rich-content-common';
import { withToolbarType } from '../utils';

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
    helpers: withToolbarType(helpers, ToolbarType.FORMATTING),
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
