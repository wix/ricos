export interface ThemeUtils {
  fallbackColor: string;
  fallbackColorBright: string;
  isBright: (hexColor: string) => boolean;
  adaptForeground: (actionColor: string) => string;
  toCssRgbA: (hexColor: string, opacity: number) => string;
}

type HexColor = string;
export type PaletteColor = HexColor | 'transparent';

/** Colors scheme for `Ricos`.
 *
 * {@link https://wix-incubator.github.io/rich-content/docs/ricos/ricos-api/#theme Read More}
 * @example
 * ```ts
 * const palette: PaletteColors = {
 *  textColor: '#111111',
 *  actionColor: '#8454FC',
 *  bgColor: '#FFFFFF',
 * };
 * ```
 */
export interface PaletteColors {
  actionColor: PaletteColor;
  bgColor: PaletteColor;
  textColor: PaletteColor;
}
