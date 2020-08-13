import {
  createTextButtonProps,
  createPluginButtonPropMap,
} from './buttons/utils/createButtonProps';

export const createInsertPluginToolbarButtonProps = (pluginButtonProps, { buttons, t }) =>
  createPluginButtonPropMap({
    pluginButtonProps,
    pluginButtonNames: buttons,
    t,
  });

export const createFormattingToolbarButtonProps = ({
  buttons,
  textPluginButtons,
  defaultTextAlignment,
  t,
  config,
  setEditorState,
  getEditorState,
}) =>
  createTextButtonProps({
    buttons,
    textPluginButtons,
    defaultTextAlignment,
    t,
    config,
    setEditorState,
    getEditorState,
  });
