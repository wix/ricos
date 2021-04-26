import {
  decorateComponentWithProps,
  FORMATTING_BUTTONS,
  TOOLBARS,
} from 'wix-rich-content-editor-common';
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
import AddPluginButton from '../AddPluginButton';
import createThemedSeparator from './createThemedSeparator';

export default ({
  buttons,
  theme,
  t,
  isMobile,
  textPluginButtons = {},
  uiSettings,
  config,
  helpers,
  setEditorState,
  getEditorState,
  pubsub,
  mobileTheme,
  addPluginMenuConfig,
  pluginButtons,
}) => {
  const themedSeparator = () => createThemedSeparator({ theme });
  const customSettings =
    config?.getToolbarSettings?.({}).find(setting => setting.name === TOOLBARS.TEXT) || {};
  const icons = customSettings?.getIcons?.() || {};
  const isHeadingsPluginCreated = Object.keys(textPluginButtons).find(
    buttonName => buttonName === FORMATTING_BUTTONS.HEADINGS
  );

  const textPluginButtonComponentMap = Object.entries(textPluginButtons).reduce(
    (list, [name, { component }]) => (component ? { ...list, [name]: component } : list),
    {}
  );

  const buttonsMap = {
    [FORMATTING_BUTTONS.BOLD]: boldButton(icons.Bold),
    [FORMATTING_BUTTONS.ITALIC]: italicButton(icons.Italic),
    [FORMATTING_BUTTONS.UNDERLINE]: underlineButton(icons.Underline),
    [FORMATTING_BUTTONS.TITLE]:
      !isHeadingsPluginCreated &&
      titleButton(icons.inactiveIconTitle, icons.TitleOne, icons.TitleTwo),
    [FORMATTING_BUTTONS.BLOCKQUOTE]: blockquoteButton(icons.Blockquote),
    [FORMATTING_BUTTONS.ALIGN_LEFT]: alignTextLeftButton(icons.AlignLeft),
    [FORMATTING_BUTTONS.ALIGN_CENTER]: alignTextCenterButton(icons.AlignCenter),
    [FORMATTING_BUTTONS.ALIGN_RIGHT]: alignTextRightButton(icons.AlignRight),
    [FORMATTING_BUTTONS.ALIGN_JUSTIFY]: alignTextJustifyButton(icons.AlignJustify),
    [FORMATTING_BUTTONS.ORDERED_LIST]: orderedListButton(icons.OrderedList),
    [FORMATTING_BUTTONS.UNORDERED_LIST]: unorderedListButton(icons.UnorderedList),
    Alignment: textAlignmentButton(icons),
    '|': themedSeparator(),
    AddPlugin: decorateComponentWithProps(AddPluginButton, {
      openModal: helpers?.openModal,
      closeModal: helpers?.closeModal,
      structure: pluginButtons?.filter(({ buttonSettings }) =>
        buttonSettings.toolbars.includes(TOOLBARS.MOBILE)
      ),
      getEditorState,
      setEditorState,
      pubsub,
      t,
      theme: mobileTheme,
      addPluginMenuConfig,
    }),
    ...textPluginButtonComponentMap,
  };

  return buttons
    .map(buttonName => buttonsMap[buttonName])
    .filter(x => x)
    .map(b => decorateComponentWithProps(b, { t, isMobile, uiSettings, config }));
};
