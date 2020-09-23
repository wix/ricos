export const fallbackColor = '#000000';
export const fallbackColorBright = '#ffffff';

function getBrightness(hexCode: string): number {
  // return between 0-255
  // strip off any leading #
  const _hexCode = hexCode.replace('#', '');

  const r = parseInt(_hexCode.substr(0, 2), 16);
  const g = parseInt(_hexCode.substr(2, 2), 16);
  const b = parseInt(_hexCode.substr(4, 2), 16);

  return (r * 299 + g * 587 + b * 114) / 1000;
}

export function isBright(hexColor: string): boolean {
  return getBrightness(hexColor) > 150;
}

export function adaptForeground(actionColor: string): string {
  return getBrightness(actionColor) < 150 ? actionColor : fallbackColor;
  //return getBrightness(actionColor) < 255 / 2 ? actionColor : '#000000';
}

const hexRegex = /^#([A-Fa-f\d]{2}){1,3}$/;

/**
 * Converts `hexColor` from HEX format to RGB format
 * @param hexColor color in HEX format
 * @returns `RGB` object
 */
function hexToRgb(hexColor: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexColor.toLowerCase());
  if (result) {
    return {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16),
    };
  }
  throw new Error('Bad Hex');
}

/**
 * Creates an RGB tuple based on a given HEX color.
 * (Used for CSS-Vars tuples in `params.scss`).
 * @example
 * toRgbTuple('#FFFFFF') => '255, 255, 255'
 *
 * @param hexColor color in HEX format
 * @returns RGB tuple
 */
export function toRgbTuple(hexColor: string) {
  const { r, g, b } = hexToRgb(hexColor);
  return `${r}, ${g}, ${b}`;
}

/**
 * Converts `hexColor` from HEX format to a CSS RGBA string
 * @example
 * toCssRgbA('#FFFFFF', 0.5) => 'rgba(255, 255, 255, 0.5)'
 *
 * @param hexColor color in HEX format
 * @returns RGB object
 */
export function toCssRgbA(hexColor: string, opacity: number): string {
  if (hexRegex.test(hexColor)) {
    return 'rgba(' + hexToRgb(hexColor) + `, ${opacity || 1})`;
  }
  throw new Error('Bad Hex');
}
