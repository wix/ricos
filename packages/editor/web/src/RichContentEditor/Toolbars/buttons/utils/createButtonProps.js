import { TOOLBARS, TEXT_BUTTONS } from 'wix-rich-content-editor-common';
import getTextButtonProps from '../TextButtonProps';

export const createButtonProps = (
  pluginButtonProps,
  { textPluginButtons, defaultTextAlignment, t, config, setEditorState, getEditorState }
) => {
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

  const pluginButtonPropMap = pluginButtonProps.reduce(
    (list, button) => ({ ...list, [button.name]: button }),
    {}
  );
  const textPluginButtonProps = Object.entries(textPluginButtons).reduce(
    (list, [name, { externalizedButtonProps }]) =>
      externalizedButtonProps && {
        ...list,
        [name]: {
          ...externalizedButtonProps,
          name,
        },
      },
    {}
  );
  return {
    buttonProps: { ...buttonPropsByName, ...textPluginButtonProps, ...pluginButtonPropMap },
  };
};
