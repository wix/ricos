import { CSSProperties } from 'react';

export interface ThemeUtils {
  fallbackColor: string;
  fallbackColorBright: string;
  isBright: (hexColor: string) => boolean;
  adaptForeground: (actionColor: string) => string;
  toCssRgbA: (hexColor: string, opacity: number) => string;
}

/** Colors scheme for `Ricos`.
 *
 * {@link https://wix-incubator.github.io/rich-content/docs/ricos/ricos-api/#theme Read More}
 * @example
 * ```ts
 * const palette: PaletteColors = {
 *  textColor: '#111111',
 *  actionColor: 'rgb(132, 84, 252)',
 *  bgColor: 'transparent',
 * };
 * ```
 */
export interface PaletteColors {
  actionColor: string;
  bgColor: string;
  textColor: string;
}
export interface ThemeGeneratorFunction {
  (colors: PaletteColors, utils: ThemeUtils, customStyles?: RicosCustomStyles): void;
}

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
export interface RicosCustomStyles {
  h2?: CustomTextualStyle;
  h3?: CustomTextualStyle;
  h4?: CustomTextualStyle;
  h5?: CustomTextualStyle;
  h6?: CustomTextualStyle;
  p?: CustomTextualStyle;
  quote?: CustomTextualStyle;
  link?: CustomTextualStyle;
  hashtag?: CustomTextualStyle;
  button?: CustomTextualStyle;
}
