/* eslint-disable @typescript-eslint/no-explicit-any */
import { EditorState } from 'draft-js';
import { ComponentType } from 'react';
import { ToolbarType, InsertButton } from './index';

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
  getVisibilityFn?: () => PlatformSettings<(editorState: EditorState) => boolean>;
  getPositionOffset?: () => PlatformSettings<{ x: number; y: number }>;
  getButtons?: () => PlatformSettings<any[]>;
  getTextPluginButtons?: () => PlatformSettings<{ [key: string]: ComponentType }>;
}

type TextButtons = {
  desktop: string[];
  mobile: string[];
};

type PluginTextButtons = {
  desktop: { [key: string]: ComponentType };
  mobile: { [key: string]: ComponentType };
};

export type GetToolbarSettings = ({
  textButtons,
  pluginButtons,
  pluginTextButtons,
}: {
  textButtons: TextButtons;
  pluginButtons: {
    buttonSettings: InsertButton;
    component: ComponentType;
    blockType: string;
  }[];
  pluginTextButtons: PluginTextButtons;
}) => ToolbarSettingsFunctions[];
