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
