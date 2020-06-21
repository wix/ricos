import { isObject } from 'lodash';
import { TOOLBARS, TEXT_BUTTONS, BUTTON_TYPES } from 'wix-rich-content-editor-common';
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
    TEXT_BUTTONS.BOLD,
    TEXT_BUTTONS.ITALIC,
    TEXT_BUTTONS.UNDERLINE,
    TEXT_BUTTONS.BLOCKQUOTE,
    TEXT_BUTTONS.ALIGN_LEFT,
    TEXT_BUTTONS.ALIGN_CENTER,
    TEXT_BUTTONS.ALIGN_RIGHT,
    TEXT_BUTTONS.ALIGN_JUSTIFY,
    TEXT_BUTTONS.ORDERED_LIST,
    TEXT_BUTTONS.UNORDERED_LIST,
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
  buttonPropsByName.Title = getTextButtonProps.Title({ // eslint-disable-line
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
  return mapButtonNamesToProps(textButtonNames, buttonPropMap);
};

const mapButtonNamesToProps = (names, buttonPropMap) => {
  return names.reduce((list, name, idx) => {
    // grouped button props added as a sublist
    if (isObject(name)) {
      const [groupName, groupButtonNames] = Object.entries(name)[0];
      return {
        ...list,
        [groupName]: {
          type: BUTTON_TYPES.GROUP,
          name: groupName,
          buttonProps: mapButtonNamesToProps(groupButtonNames, buttonPropMap),
        },
      };
    }
    // multiple separators case
    const currentName = list[name] ? `${name}_${idx}` : name;
    return { ...list, [currentName]: buttonPropMap[name] };
  }, {});
};

export const createPluginButtonPropMap = ({ pluginButtonProps, toolbarName }) => {
  const buttonProps = pluginButtonProps.reduce(
    (list, button) =>
      button.toolbars.includes(toolbarName) ? { ...list, [button.name]: button } : list,
    {}
  );
  return buttonProps;
};
