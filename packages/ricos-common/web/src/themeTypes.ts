import { RichContentTheme, PaletteColors, ThemeUtils } from 'wix-rich-content-common';
import { ReactElement } from 'react';
import { EditorPluginConfig, ViewerPluginConfig } from './types';
export type RicosCssOverride = RichContentTheme;

export interface ThemeGeneratorFunction {
  (colors: PaletteColors, utils: ThemeUtils): void;
}

export interface WixColor {
  name: string;
  reference: string;
  value: string;
}

/** Ricos can work with a Wix Palette object */
export type WixPalette = WixColor[];

export type PalettePreset = 'darkTheme';

export interface RicosTheme {
  palette?: PaletteColors | WixPalette | PalettePreset;
  /** You'll have to specify a parent `className` if you plan to apply different palettes for multiple
   * Ricos instances living next to each other.
   * {@link https://wix-incubator.github.io/rich-content/docs/ricos/ricos-api/#theme Read More}.
   *
   * Otherwise, you can ignore this field.
   * @example
   * ```js
   * <div className='class1'>
   *  <RicosEditor theme={{ parentClass: 'class1', palette: lightPalette }} />
   * </div>
   * <div className='class2'>
   *  <RicosEditor theme={{ parentClass: 'class2', palette: darkPalette }} />
   * </div>
   * ```
   * */
  parentClass?: string;
}

export interface ThemeStrategyArgs {
  isViewer: boolean;
  plugins?: (EditorPluginConfig & ViewerPluginConfig)[];
  cssOverride?: RicosCssOverride;
}

export interface ThemeStrategyResult {
  theme: RicosCssOverride;
  html?: ReactElement;
}

export type ThemeStrategyFunction = (args: ThemeStrategyArgs) => ThemeStrategyResult;
