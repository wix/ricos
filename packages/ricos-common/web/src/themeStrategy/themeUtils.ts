import { CssVarsObject } from './themeTypes';
export const fallbackColor = '#000000';
export const fallbackColorBright = '#FFFFFF';

function rgbaToHexA(rgbaArr: string[], withAlpha?: boolean) {
  const rgba = rgbaArr.map((r, index) => {
    if (r.indexOf('%') > -1) {
      const p = parseFloat(r.substr(0, r.length - 1)) / 100;

      if (index < 3) {
        return Math.round(p * 255);
      }
      return p;
    }
    return parseFloat(r);
  });

  let r = Number(rgba[0]).toString(16),
    g = Number(rgba[1]).toString(16),
    b = Number(rgba[2]).toString(16),
    a = Math.round(Number(rgba[3]) * 255).toString(16);

  if (r.length === 1) r = '0' + r;
  if (g.length === 1) g = '0' + g;
  if (b.length === 1) b = '0' + b;
  if (a.length === 1) a = '0' + a;

  return '#' + r + g + b + (withAlpha ? a : '');
}

export function toHexFormat(color: string): string {
  if (color === 'transparent') {
    return fallbackColorBright + '00';
  }
  if ((color.startsWith('rgb(') || color.startsWith('rgba(')) && color.endsWith(')')) {
    const rgba = color.replace(/^(rgba\()|^(rgb\()|(\s)|(\))$/g, '').split(',');
    if (rgba.length === 4) {
      return rgbaToHexA(rgba, true);
    } else if (rgba.length === 3) {
      return rgbaToHexA(rgba);
    } else throw Error('[ricos-common] themeUtils.ts: Bad RGB / RGBA value: ' + color);
  }
  if (!color.startsWith('#')) {
    throw Error(
      `[ricos-common] themeUtils.ts: Bad Hex (${color}).
      Ricos color can only accept "transparent" or a HEX formatted color as its value`
    );
  }
  return color;
}

/**
 * Brightness of a HEX color (`0-255`)
 * @param hexCode Color in HEX format
 */
function getBrightness(hexCode: string): number {
  const _hexCode = hexCode.replace('#', '');

  const r = parseInt(_hexCode.substr(0, 2), 16);
  const g = parseInt(_hexCode.substr(2, 2), 16);
  const b = parseInt(_hexCode.substr(4, 2), 16);

  return (r * 299 + g * 587 + b * 114) / 1000;
}

/**
 * Ricos Brightness standard
 * @param hexColor Color in HEX format
 */
export function isBright(hexColor: string): boolean {
  return getBrightness(hexColor) > 150;
}

/**
 * Converts a given action color into a default, darker `fallbackColor`
 * if the given one is too bright. else, returns `actionColor`.
 *
 * Use this to prevent "bright-on-bright" content occurrence.
 * @param actionColor HEX Format
 */
export function adaptForeground(actionColor: string): string {
  return getBrightness(actionColor) < 150 ? actionColor : fallbackColor;
}

/**
 * Converts `hexColor` from HEX format to RGB format
 * @param hexColor color in HEX format
 * @returns `RGB` object
 */
function hexToRgbA(hexColor: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})?$/i.exec(
    hexColor.toLowerCase()
  );
  if (result) {
    return {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16),
      a: parseInt(result[4], 16),
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
  const { r, g, b } = hexToRgbA(hexColor);
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
  if (/^#([A-Fa-f\d]{2}){1,4}$/.test(hexColor)) {
    const { r, g, b, a } = hexToRgbA(hexColor);
    return `rgba(${r}, ${g}, ${b}, ${opacity * (a || 1)})`;
  }
  throw new Error('[ricos-common] themeUtils.ts: Bad Hex');
}

export const toDashedKey = (str: string) =>
  str.replace(/([A-Z])/g, (all, letter) => '-' + letter.toLowerCase());

const spacing = ' '.repeat(4);
export const toVarStrings = (varsObject: CssVarsObject) => {
  const convertToRicosKey = (key: string) => '--ricos-' + toDashedKey(key);
  return Object.entries(varsObject)
    .filter(entry => !!entry[1])
    .map(entry => convertToRicosKey(entry[0]) + ': ' + entry[1] + ';\n')
    .join(spacing);
};

export const buildCssVars = (parentClass: string, ...varObjects: CssVarsObject[]) => `
  ${parentClass ? `.${parentClass}` : '*'} {
    ${varObjects
      .map(toVarStrings)
      .join(spacing)
      .replace(/[\s\t]+$/, '')}
  }\n`;
