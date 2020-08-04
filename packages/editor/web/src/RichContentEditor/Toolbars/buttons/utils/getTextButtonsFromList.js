import { decorateComponentWithProps, TOOLBARS } from 'wix-rich-content-editor-common';
import { HEADINGS_DROPDOWN_TYPE } from 'wix-rich-content-common';
import {
  boldButton,
  italicButton,
  underlineButton,
  titleButton,
  blockquoteButton,
  alignTextLeftButton,
  alignTextCenterButton,
  alignTextRightButton,
  alignTextJustifyButton,
  orderedListButton,
  unorderedListButton,
  textAlignmentButton,
} from '../index';
import createThemedSeparator from './createThemedSeparator';

export default ({ buttons, theme, t, isMobile, textPluginButtons = {}, uiSettings, config }) => {
  const themedSeparator = horizontal => createThemedSeparator({ theme, horizontal });
  const customSettings =
    config?.getToolbarSettings?.({}).find(setting => setting.name === TOOLBARS.TEXT) || {};
  const icons = customSettings?.getIcons?.() || {};
  const isHeadingsPluginCreated = Object.keys(textPluginButtons).find(buttonName =>
    buttonName.includes(HEADINGS_DROPDOWN_TYPE)
  );

  const textPluginButtonComponentMap = Object.entries(textPluginButtons).reduce(
    (list, [name, { component }]) => (component ? { ...list, [name]: component } : list),
    {}
  );

  const buttonsMap = {
    Bold: boldButton(icons.Bold),
    Italic: italicButton(icons.Italic),
    Underline: underlineButton(icons.Underline),
    Title:
      !isHeadingsPluginCreated &&
      titleButton(icons.inactiveIconTitle, icons.TitleOne, icons.TitleTwo),
    Blockquote: blockquoteButton(icons.Blockquote),
    Alignment: textAlignmentButton(icons),
    AlignLeft: alignTextLeftButton(icons.AlignLeft),
    AlignCenter: alignTextCenterButton(icons.AlignCenter),
    AlignRight: alignTextRightButton(icons.AlignRight),
    AlignJustify: alignTextJustifyButton(icons.AlignJustify),
    OrderedList: orderedListButton(icons.OrderedList),
    UnorderedList: unorderedListButton(icons.UnorderedList),
    Separator: themedSeparator(false),
    HorizontalSeparator: themedSeparator(true),
    ...textPluginButtonComponentMap,
  };

  return buttons
    .map(buttonName => buttonsMap[buttonName])
    .filter(x => x)
    .map(b => decorateComponentWithProps(b, { t, isMobile, uiSettings, config }));
};
