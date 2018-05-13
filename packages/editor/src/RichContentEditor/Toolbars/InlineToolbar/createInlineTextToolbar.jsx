
import get from 'lodash/get';
import createInlineToolbar from './createInlineToolbar';
import { DesktopTextButtonList } from '../buttons/';
import { getTextButtonsFromList } from '../buttons/utils';


export default ({ buttons, pubsub, theme, isMobile, helpers, anchorTarget, relValue, t }) => {
  const textButtons = get(buttons, 'desktop', DesktopTextButtonList);
  const structure = getTextButtonsFromList({ buttons: textButtons, pubsub, theme, t });

  return createInlineToolbar({
    name: 'InlineTextToolbar',
    structure,
    pubsub,
    theme,
    isMobile,
    helpers,
    anchorTarget,
    relValue,
    t
  });
};
