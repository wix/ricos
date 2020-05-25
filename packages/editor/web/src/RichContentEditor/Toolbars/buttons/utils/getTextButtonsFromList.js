import { decorateComponentWithProps } from 'wix-rich-content-editor-common';
import createTextAlignmentButton from '../TextAlignmentButton';
import { createButtonProps } from './createButtonProps';
import createTextToolbarButton from './createTextToolbarButton';
import createThemedSeparator from './createThemedSeparator';

export default ({
  buttons,
  theme,
  t,
  isMobile,
  textPluginButtons = {},
  uiSettings,
  config,
  defaultTextAlignment,
  setEditorState,
  getEditorState,
}) => {
  const themedSeparator = horizontal => createThemedSeparator({ theme, horizontal });
  const { buttonProps } = createButtonProps([], {
    textPluginButtons,
    defaultTextAlignment,
    t,
    config,
    setEditorState,
    getEditorState,
  });
  const textButtons = Object.entries(buttonProps).reduce(
    (list, [name, props]) => ({
      ...list,
      [name]: createTextToolbarButton(props),
    }),
    {}
  );
  const buttonByName = {
    ...textButtons,
    Alignment: createTextAlignmentButton({ buttonProps, getEditorState, defaultTextAlignment }),
    Separator: themedSeparator(false),
    HorizontalSeparator: themedSeparator(true),
  };
  const textPluginButtonComponentMap = Object.entries(textPluginButtons).reduce(
    (list, [name, { component }]) => (component ? { ...list, [name]: component } : list),
    {}
  );
  const buttonMap = { ...buttonByName, ...textPluginButtonComponentMap };
  const structure = buttons.map(buttonName => buttonMap[buttonName]).filter(b => b !== undefined);
  return structure.map(b => decorateComponentWithProps(b, { t, isMobile, uiSettings, config }));
};
