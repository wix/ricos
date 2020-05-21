/* eslint-disable */
import { TOOLBARS } from 'wix-rich-content-editor-common';
import getTextButtonProps from '../TextButtonProps';

export const createTextButtonProps = ({
  buttons,
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
    'Bold',
    'Italic',
    'Underline',
    'Blockquote',
    'AlignLeft',
    'AlignCenter',
    'AlignRight',
    'AlignJustify',
    'OrderedList',
    'UnorderedList',
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

  const textPluginButtonProps = Object.entries(textPluginButtons).reduce(
    (list, [name, { externalizedButtonProps }]) => ({
      ...list,
      [name]: externalizedButtonProps,
    }),
    {}
  );
  const buttonPropMap = { ...buttonPropsByName, ...textPluginButtonProps };
  console.log({ buttonPropMap, textPluginButtons });
};
