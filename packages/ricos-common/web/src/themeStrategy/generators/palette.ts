import { PaletteColors } from 'wix-rich-content-common';
import { adaptForeground, toRgbTuple, toHexFormat } from '../themeUtils';
import { presets, assertWixPalette, COLORS, isRicosPalette, getColorValue } from '../palettes';
import { RicosTheme, CssVarsObject, PaletteConfig } from '../themeTypes';

const createCssVars = (colors: PaletteColors, config?: PaletteConfig): CssVarsObject => {
  const { contentBgColor = false } = config || {};
  const {
    textColor,
    bgColor: backgroundColor,
    actionColor,
    fallbackColor = '#000000',
    disabledColor,
    textColorLow,
    settingsActionColor,
  } = colors;
  return {
    textColor,
    textColorTuple: toRgbTuple(textColor),
    actionColor,
    actionColorTuple: toRgbTuple(actionColor),
    actionColorFallback: adaptForeground(actionColor, fallbackColor),
    actionColorFallbackTuple: toRgbTuple(adaptForeground(actionColor, fallbackColor)),
    backgroundColor,
    backgroundColorTuple: toRgbTuple(backgroundColor),
    fallbackColor,
    fallbackColorTuple: toRgbTuple(fallbackColor),
    disabledColor,
    disabledColorTuple: disabledColor ? toRgbTuple(disabledColor) : undefined,
    textColorLow,
    textColorLowTuple: textColorLow ? toRgbTuple(textColorLow) : undefined,
    bgColorContainer: contentBgColor ? backgroundColor : undefined,
    settingsActionColor,
    settingsActionColorTuple: settingsActionColor ? toRgbTuple(settingsActionColor) : undefined,
  };
};

const extractColors = (palette: RicosTheme['palette']): PaletteColors => {
  if (typeof palette === 'string') {
    if (palette in presets) {
      return presets[palette];
    } else {
      throw Error(`Palette ${palette} is unknown. Supported themes: ${presets.toString()}`);
    }
  } else if (Array.isArray(palette)) {
    assertWixPalette(palette);
    return {
      actionColor: getColorValue(palette, COLORS.ACTION_COLOR),
      bgColor: getColorValue(palette, COLORS.BG_COLOR),
      textColor: getColorValue(palette, COLORS.TEXT_COLOR),
      disabledColor: getColorValue(palette, COLORS.DISABLED_COLOR),
      textColorLow: getColorValue(palette, COLORS.TEXT_COLOR_LOW),
    };
  } else if (palette && isRicosPalette(palette)) {
    return palette;
  }
  throw Error('Unrecognized Palette object. Please refer to Ricos Theme Documentation');
};

interface PaletteStrategyResult {
  paletteVarsObject: CssVarsObject;
  colors?: PaletteColors;
}

export default function createPalette(
  palette?: RicosTheme['palette'],
  config?: RicosTheme['paletteConfig']
): PaletteStrategyResult {
  if (!palette) {
    return { paletteVarsObject: {} };
  }

  const colors = extractColors(palette);
  Object.entries(colors).forEach(
    ([colorName, value]) =>
      (colors[colorName] = value && typeof value === 'string' ? toHexFormat(value) : value)
  );
  const paletteVarsObject = createCssVars(colors, config);

  return { paletteVarsObject, colors };
}
