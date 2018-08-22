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
    visibilityFn
  } = config;

  const structure = getTextButtonsFromList({ buttons, textPluginButtons, pubsub, theme, t });

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
    visibilityFn
  });
};
