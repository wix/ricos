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

export function hexToRgbA(hexColor: string, opacity: number): string {
  let c;
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hexColor)) {
    c = hexColor.substring(1).split('');
    if (c.length === 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    c = '0x' + c.join('');
    // eslint-disable-next-line no-bitwise
    return 'rgba(' + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') + `,${opacity || 1})`;
  }
  throw new Error('Bad Hex');
}
