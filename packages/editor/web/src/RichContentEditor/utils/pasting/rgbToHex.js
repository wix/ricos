const parseRGB = rgbString => {
  const sep = rgbString.indexOf(',') > -1 ? ',' : ' ';
  const rgb = rgbString
    .substr(4)
    .split(')')[0]
    .split(sep);

  if (rgb?.length !== 3) {
    return null;
  }

  return rgb;
};

const tooDark = luma => luma <= 50;

const tooLight = luma => luma > 220;

const shouldConvertRGB = rgb => {
  if (!rgb) {
    return false;
  }

  const r = Number(rgb[0]),
    g = Number(rgb[1]),
    b = Number(rgb[2]);

  //luma value range is 0..255, where 0 is the darkest and 255 is the lightest.
  const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;

  if (tooDark(luma) || tooLight(luma)) {
    return false;
  }

  return true;
};

export default rgbString => {
  const rgb = parseRGB(rgbString);

  if (shouldConvertRGB(rgb)) {
    let r = Number(rgb[0]).toString(16),
      g = Number(rgb[1]).toString(16),
      b = Number(rgb[2]).toString(16);

    if (r.length === 1) r = '0' + r;
    if (g.length === 1) g = '0' + g;
    if (b.length === 1) b = '0' + b;

    return '#' + r + g + b;
  }

  return null;
};
