/* eslint-disable @typescript-eslint/no-explicit-any */

type ToolbarType = import('./toolbarEnums').ToolbarType;

interface PlatformSettings<T> {
  desktop: T;
  mobile: {
    ios: T;
    android: T;
  };
}

interface ToolbarSettingsFunctions {
  name: ToolbarType;
  shouldCreate?: () => PlatformSettings<boolean>;
  getVisibilityFn?: () => PlatformSettings<(editorState: DraftEditorState) => boolean>;
  getPositionOffset?: () => PlatformSettings<{ x: number; y: number }>;
  getButtons?: () => PlatformSettings<any[]>;
  getTextPluginButtons?: () => PlatformSettings<{ [key: string]: ReactComponentType }>;
}

type TextButtons = {
  desktop: string[];
  mobile: string[];
};

type PluginTextButtons = {
  desktop: { [key: string]: ReactComponentType };
  mobile: { [key: string]: ReactComponentType };
};

type GetToolbarSettings = ({
  textButtons,
  pluginButtons,
  pluginTextButtons,
}: {
  textButtons: TextButtons;
  pluginButtons: { buttonSettings: InsertButton; component: ReactComponentType }[];
  pluginTextButtons: PluginTextButtons;
}) => ToolbarSettingsFunctions[];
