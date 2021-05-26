import { AugmentedRequired } from 'utility-types/dist/mapped-types';
import { CSSProperties } from 'react';

export interface ThemeUtils {
  isBright: (hexColor: string) => boolean;
  adaptForeground: (actionColor?: string, fallbackColor?: string) => string;
  toCssRgbA: (hexColor: string, opacity: number) => string;
}

/** Colors scheme for `Ricos`.
 *
 * {@link https://wix.github.io/ricos/docs/ricos/ricos-api/#theme Read More}
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
  actionColor?: string;
  bgColor?: string;
  textColor?: string;
  textColorLow?: string;
  disabledColor?: string;
  /** Default is black.
   * When `ActionColor` is too bright, it is replaced with `FallbackColor` when used on bright backgrounds (e.g modals, toolbars).
   * Therefore this color should remain relatively dark. */
  fallbackColor?: string;
}

export interface ThemeData {
  colors?: PaletteColors;
  utils: ThemeUtils;
  customStyles?: RicosCustomStyles;
}
export interface ThemeGeneratorFunction {
  (themeData: AugmentedRequired<ThemeData, 'colors'>): void;
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
  quote?: CustomTextualStyle & { borderColor?: CSSProperties['borderColor'] };
  link?: CustomTextualStyle;
  hashtag?: CustomTextualStyle;
  button?: Pick<CustomTextualStyle, 'color'>;
}
