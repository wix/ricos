/* eslint-disable @typescript-eslint/no-explicit-any */
type ToolbarType = 'SIDE' | 'MOBILE' | 'FOOTER' | 'TEXT' | 'INLINE';

type DISPLAY_MODE = {
  NORMAL: 'NORMAL';
  FLOATING: 'FLOATING';
};

type ReactComponentType = import('react').ComponentType;

interface PlatformSettings<T> {
  desktop: T;
  mobile: {
    ios: T;
    android: T;
  };
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
  pluginButtons: any[];
  pluginTextButtons: PluginTextButtons;
}) => ToolbarSettingsFunctions[];

interface ToolbarSettingsFunctions {
  name: ToolbarType;
  shouldCreate: () => PlatformSettings<boolean>;
  getVisibilityFn: () => PlatformSettings<(editorState: DraftEditorState) => boolean>;
  getPositionOffset: () => PlatformSettings<{ x: number; y: number }>;
  getButtons: () => PlatformSettings<any[]>;
  getTextPluginButtons: () => PlatformSettings<{ [key: string]: ReactComponentType }>;
}