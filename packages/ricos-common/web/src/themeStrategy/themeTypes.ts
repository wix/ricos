import { RichContentTheme, PaletteColors, ThemeUtils } from 'wix-rich-content-common';
import { CSSProperties, ReactElement } from 'react';
import { EditorPluginConfig, ViewerPluginConfig } from '../types';
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

export interface CustomTextualStyle {
  fontSize?: CSSProperties['fontSize'];
  fontFamily?: CSSProperties['fontFamily'];
  fontWeight?: CSSProperties['fontWeight'];
  fontStyle?: CSSProperties['fontStyle'];
  textDecoration?: CSSProperties['textDecoration'];
  lineHeight?: CSSProperties['lineHeight'];
  minHeight?: CSSProperties['minHeight'];
  color?: CSSProperties['color'];
}
export interface RicosCustomTheme {
  h2?: CustomTextualStyle;
  h3?: CustomTextualStyle;
  h4?: CustomTextualStyle;
  h5?: CustomTextualStyle;
  h6?: CustomTextualStyle;
  p?: CustomTextualStyle;
  quote?: CustomTextualStyle;
  link?: CustomTextualStyle;
  hashtag?: CustomTextualStyle;
}

export interface RicosTypography {
  /**
   * WixTypography - work in progress.
   * This field is ineffective at the moment.
   */
  wixTypography?: WixTypography;
  fontFamily?: CSSProperties['fontFamily'];
}

export interface WixTypography {
  Title: WixTypographyDefinition;
  Menu: WixTypographyDefinition;
  'Page-title': WixTypographyDefinition;
  'Heading-XL': WixTypographyDefinition;
  'Heading-L': WixTypographyDefinition;
  'Heading-M': WixTypographyDefinition;
  'Heading-S': WixTypographyDefinition;
  'Body-L': WixTypographyDefinition;
  'Body-M': WixTypographyDefinition;
  'Body-S': WixTypographyDefinition;
  'Body-XS': WixTypographyDefinition;
}

export interface WixTypographyDefinition {
  editorKey: string;
  lineHeight: string;
  style: string;
  weight: string;
  size: string;
  fontFamily: string;
  value: string; // contains all of the above information (except editorKey), ready for css `font` value
}

export interface RicosTheme {
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
  palette?: PaletteColors | WixPalette | PalettePreset;
  typography?: RicosTypography;
  customs?: RicosCustomTheme;
}

export interface ThemeStrategyArgs {
  plugins?: (EditorPluginConfig & ViewerPluginConfig)[];
  cssOverride?: RicosCssOverride;
  ricosTheme?: RicosTheme;
}

export interface ThemeStrategyResult {
  theme: RicosCssOverride;
  html?: ReactElement;
}

export type CssVarsObject = Record<string, unknown>;
