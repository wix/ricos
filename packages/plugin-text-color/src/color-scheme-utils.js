import { isHexColor, validate } from 'wix-rich-content-common';
import { isObject } from 'lodash';
import { DEFAULT_PALETTE } from './constants';
import schema from '../statics/color-scheme.json';

export const validateColorScheme = colorScheme =>
  isObject(colorScheme) && Object.values(colorScheme).every(value => validate(value, schema));

export const extractColor = (colorScheme, style) => {
  if (colorScheme && colorScheme[style]) {
    return colorScheme[style].color;
  } else if (isHexColor(style)) {
    return style;
  }
};

export const extractPalette = colorScheme => {
  if (!colorScheme) {
    return DEFAULT_PALETTE;
  }
  return Object.values(colorScheme)
    .sort((entry1, entry2) => (entry1.index > entry2.index ? 1 : -1))
    .map(entry => entry.color);
};

export const extractSchemeAttributes = colorScheme => {
  if (!colorScheme) {
    return null;
  }
  return Object.keys(colorScheme).reduce((sorted, key) => {
    if (!sorted.length || colorScheme[key].index > colorScheme[sorted[0]].index) {
      sorted.push(key);
    } else {
      sorted.unshift(key);
    }
    return sorted;
  }, []);
};
