/* eslint-disable @typescript-eslint/no-explicit-any */
type ToolbarType = 'SIDE' | 'MOBILE' | 'FOOTER' | 'TEXT' | 'INLINE';

interface PlatformSettings<T> {
  desktop: T;
  mobile: {
    ios: T;
    android: T;
  };
}

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
