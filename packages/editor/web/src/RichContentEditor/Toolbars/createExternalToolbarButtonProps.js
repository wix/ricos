import { TOOLBARS } from 'wix-rich-content-editor-common';
import {
  createTextButtonProps,
  createPluginButtonPropMap,
} from './buttons/utils/createButtonProps';

export const createExternalToolbarButtonProps = (
  pluginButtonProps,
  { textPluginButtons, defaultTextAlignment, t, config, setEditorState, getEditorState }
) => {
  return {
    buttonProps: {
      ...createTextButtonProps({
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
