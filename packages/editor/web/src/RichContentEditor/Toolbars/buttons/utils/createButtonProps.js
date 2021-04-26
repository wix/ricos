import { isObject } from 'lodash';
import { TOOLBARS, FORMATTING_BUTTONS, BUTTON_TYPES } from 'wix-rich-content-editor-common';
import getTextButtonProps from '../TextButtonProps';

export const createTextButtonProps = ({
  buttons: textButtonNames,
  textPluginButtons,
  defaultTextAlignment,
  t,
  config,
  setEditorState,
  getEditorState,
}) => {
  const customSettings = config
    ?.getToolbarSettings?.({})
    .find(setting => setting.name === TOOLBARS.TEXT);
  const icons = customSettings?.getIcons?.() || {};
  const buttonPropsByName = [
    FORMATTING_BUTTONS.BOLD,
    FORMATTING_BUTTONS.ITALIC,
    FORMATTING_BUTTONS.UNDERLINE,
    FORMATTING_BUTTONS.BLOCKQUOTE,
    FORMATTING_BUTTONS.ALIGN_LEFT,
    FORMATTING_BUTTONS.ALIGN_CENTER,
    FORMATTING_BUTTONS.ALIGN_RIGHT,
    FORMATTING_BUTTONS.ALIGN_JUSTIFY,
    FORMATTING_BUTTONS.ORDERED_LIST,
    FORMATTING_BUTTONS.UNORDERED_LIST,
  ].reduce(
    (list, name) => ({
      ...list,
      [name]: getTextButtonProps[name]({
        icon: icons[name],
        t,
        setEditorState,
        getEditorState,
        alignment: defaultTextAlignment,
      }),
    }),
    {}
  );
  // eslint-disable-next-line
  buttonPropsByName.Title = getTextButtonProps.Title({
    icons: [icons.inactiveIconTitle, icons.TitleOne, icons.TitleTwo],
    t,
    getEditorState,
    setEditorState,
    alignment: defaultTextAlignment,
  });

  buttonPropsByName['|'] = {
    type: BUTTON_TYPES.SEPARATOR,
    name: 'Separator',
  };

  const textPluginButtonProps = Object.entries(textPluginButtons).reduce(
    (list, [name, { externalizedButtonProps }]) =>
      externalizedButtonProps
        ? {
            ...list,
            [name]: {
              ...externalizedButtonProps,
              name,
            },
          }
        : list,
    {}
  );
  const buttonPropMap = { ...buttonPropsByName, ...textPluginButtonProps };
  return mapButtonNamesToProps(textButtonNames, buttonPropMap, t);
};

const mapButtonNamesToProps = (
  names,
  buttonPropMap,
  t,
  filter = (buttonProps, buttonName) => buttonProps[buttonName]
) => {
  return names.reduce((list, buttonName, idx) => {
    // grouped button props added as a sublist
    if (isObject(buttonName)) {
      const { name, tooltipKey, dataHook, buttons } = buttonName;
      return {
        ...list,
        [name]: {
          type: BUTTON_TYPES.GROUP,
          name,
          dataHook,
          tooltip: t(tooltipKey),
          buttonList: mapButtonNamesToProps(buttons, buttonPropMap, t, filter),
        },
      };
    }

    // multiple separators case
    const currentName = list[buttonName] ? `${buttonName}_${idx}` : buttonName;
    const button = filter(buttonPropMap, buttonName);
    return button ? { ...list, [currentName]: button } : list;
  }, {});
};

export const createPluginButtonPropMap = ({ pluginButtonProps, pluginButtonNames, t }) => {
  const buttonPropMap = pluginButtonProps.reduce(
    (list, button) => ({ ...list, [button.name]: button }),
    {}
  );
  return mapButtonNamesToProps(pluginButtonNames, buttonPropMap, t);
};
