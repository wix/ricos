/* eslint-disable @typescript-eslint/no-explicit-any */
import { EditorState } from 'draft-js';
import { ComponentType } from 'react';
import { TranslateFunction } from './commonTypes';
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
  getTextPluginButtons?: () => PlatformSettings<{ [key: string]: any }>;
  getInstance?: (params?: any) => any;
  getDisplayOptions?: () => PlatformSettings<any>;
  getToolbarDecorationFn?: () => PlatformSettings<any>;
}

type TextButtons = {
  desktop: string[];
  mobile: string[];
};

type PluginTextButtons = { [key: string]: ComponentType };

type ButtonProps = {
  onClick?: () => void;
  getLabel?: () => string;
  tooltip?: string;
  getIcon?: () => ComponentType;
  onChange?: () => void;
  accepts?: string;
  multiple?: boolean;
  isActive?: () => boolean;
  isDisabled?: () => boolean;
  type: string;
  name?: string;
};

export type GetToolbarSettings = ({
  textButtons,
  pluginButtons,
  pluginButtonNames,
  pluginTextButtons,
  pluginButtonProps,
  t,
}: {
  textButtons: TextButtons;
  pluginButtons: {
    buttonSettings: InsertButton;
    component: ComponentType;
    blockType: string;
  }[];
  pluginButtonNames: string[];
  pluginTextButtons: PluginTextButtons;
  pluginButtonProps: ButtonProps[];
  t?: TranslateFunction;
}) => ToolbarSettingsFunctions[];
