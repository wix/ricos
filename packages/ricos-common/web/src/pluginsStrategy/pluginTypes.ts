import { PluginTypeMapper, CreatePluginFunction, InlineStyleMapper } from 'wix-rich-content-common';
import { ThemeGeneratorFunction, RicosCssOverride } from '../types';

export type ModalsMap = Record<string, import('react').ComponentType>;

interface BasicPluginConfig {
  config: Record<string, unknown>;
  type: string;
  theme?: ThemeGeneratorFunction;
}

export interface EditorPluginConfig extends BasicPluginConfig {
  createPlugin?: CreatePluginFunction;
  ModalsMap?: ModalsMap;
}

export interface ViewerPluginConfig extends BasicPluginConfig {
  typeMapper?: PluginTypeMapper;
  inlineStyleMapper?: InlineStyleMapper;
  decorator?: RicosDecorator;
}

export interface PluginConfig extends EditorPluginConfig, ViewerPluginConfig {}

export interface EditorPluginsStrategy {
  config: Record<string, unknown>;
  plugins: CreatePluginFunction[];
  ModalsMap: ModalsMap;
}

export interface ViewerPluginsStrategy {
  config: Record<string, unknown>;
  typeMappers: PluginTypeMapper[];
  inlineStyleMappers: Record<string, unknown>[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  decorators: any[];
}

export interface PluginsStrategy extends EditorPluginsStrategy, ViewerPluginsStrategy {}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type RicosDecorator = (theme: RicosCssOverride, config: Record<string, unknown>) => any;
