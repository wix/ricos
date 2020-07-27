import { TOOLBARS } from 'wix-rich-content-editor-common';
import { createPluginButtonPropMap } from './buttons/utils/createButtonProps';

export const createExternalToolbarButtonProps = pluginButtonProps =>
  createPluginButtonPropMap({ pluginButtonProps, toolbarName: TOOLBARS.EXTERNAL });
