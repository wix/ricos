export default rgbString => {
  const sep = rgbString.indexOf(',') > -1 ? ',' : ' ';
  const rgb = rgbString
    .substr(4)
    .split(')')[0]
    .split(sep);

  let r = Number(rgb[0]).toString(16),
    g = Number(rgb[1]).toString(16),
    b = Number(rgb[2]).toString(16);

  if (r.length === 1) r = '0' + r;
  if (g.length === 1) g = '0' + g;
  if (b.length === 1) b = '0' + b;

  return '#' + r + g + b;
};
