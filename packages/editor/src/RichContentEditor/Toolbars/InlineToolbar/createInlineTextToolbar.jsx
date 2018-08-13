import get from 'lodash/get';

import createInlineToolbar from './createInlineToolbar';
import { MobileTextButtonList, DesktopTextButtonList } from '../buttons/';
import { getTextButtonsFromList, reducePluginTextButtons, reducePluginTextButtonNames, mergeButtonLists } from '../buttons/utils';

export default config => {
  const {
    buttons,
    pluginTextButtonMappers,
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

  const appendSeparator = ({ mergedList, sourceList, buttonData, formFactor }) => {
    if (mergedList.length === sourceList.length &&
      (!buttonData.position || buttonData.position[formFactor] === undefined ||
        buttonData.position[formFactor] < 0 || buttonData.position[formFactor] > mergedList.length)) {
      return [...mergedList, 'Separator'];
    }
    return mergedList;
  };

  const pluginButtons = reducePluginTextButtons(pluginTextButtonMappers);
  const pluginButtonNames = reducePluginTextButtonNames(pluginTextButtonMappers);
  const buttonList = isMobile ? MobileTextButtonList : DesktopTextButtonList;
  const platformStr = isMobile ? 'mobile' : 'desktop';
  const requestedButtons = get(buttons, platformStr);
  const textButtonsList = requestedButtons || buttonList;
  const textButtons = mergeButtonLists(textButtonsList, pluginButtonNames, platformStr, appendSeparator);
  const structure = getTextButtonsFromList({ buttons: textButtons, pluginButtons, pubsub, theme, t });

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
