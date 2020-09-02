import { RichContentTheme } from 'wix-rich-content-common';
import { ReactElement } from 'react';
import { EditorPluginConfig, ViewerPluginConfig } from './types';
export type RicosCssOverride = RichContentTheme;

export interface ThemeGeneratorFunction {
  (colors: PaletteColors, utils: ThemeUtils): Record<string, unknown>;
}

export interface ThemeUtils {
  fallbackColor: string;
  fallbackColorBright: string;
  isBright: (hexColor: string) => boolean;
  adaptForeground: (actionColor: string) => string;
  hexToRgbA: (hexColor: string, opacity: number) => string;
}

export interface Color {
  name: string;
  reference: string;
  value: string;
}

export type Palette = Color[];
export interface PaletteColors {
  actionColor: string;
  bgColor: string;
  textColor: string;
  secondaryColor: string;
  color7: string;
  color4: string;
}

export interface RicosTheme {
  palette?: Palette | PalettePreset;
  parentClass?: string;
  createThemeStrategy: () => ThemeStrategyFunction;
}

export interface ThemeStrategyArgs {
  isViewer: boolean;
  plugins?: (EditorPluginConfig & ViewerPluginConfig)[];
  theme: RicosTheme;
}

export interface ThemeStrategyResult {
  theme: RicosCssOverride;
  html: ReactElement;
}

export type ThemeStrategyFunction = (args: ThemeStrategyArgs) => ThemeStrategyResult;

export type PalettePreset = 'darkTheme';
