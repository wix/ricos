import { TOOLBARS } from 'wix-rich-content-editor-common';
import {
  createTextButtonProps,
  createPluginButtonPropMap,
} from './buttons/utils/createButtonProps';

export const createExternalToolbarButtonProps = (
  pluginButtonProps,
  { buttons, textPluginButtons, defaultTextAlignment, t, config, setEditorState, getEditorState }
) => {
  return {
    buttonProps: {
      ...createTextButtonProps({
        buttons,
        textPluginButtons,
        defaultTextAlignment,
        t,
        config,
        setEditorState,
        getEditorState,
      }),
      ...createPluginButtonPropMap({ pluginButtonProps, toolbarName: TOOLBARS.EXTERNAL }),
    },
  };
};
