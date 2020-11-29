import React from 'react';
import createPalette from './generators/palette';
import createTypography from './generators/typography';
import createCustomStyles from './generators/customStyles';
import { defaultTheme } from './defaults';
import { buildCssVars } from './themeUtils';
import { ThemeStrategyArgs, ThemeStrategyResult } from './themeTypes';
import { isDefined } from 'ts-is-present';

export default function themeStrategy(args: ThemeStrategyArgs): ThemeStrategyResult {
  const { ricosTheme = {}, plugins = [], cssOverride = {} } = args;
  const themeGeneratorFunctions = plugins.map(plugin => plugin.theme).filter(isDefined);
  const { parentClass = '', palette, typography, customStyles } = ricosTheme;

  const paletteVarsObject = createPalette(palette, themeGeneratorFunctions, customStyles);
  const typographyVarsObject = createTypography(typography);
  const customsVarsObject = createCustomStyles(customStyles);

  const html = (
    <style type="text/css" key={'styleElement'}>
      {buildCssVars(parentClass, paletteVarsObject, typographyVarsObject, customsVarsObject)}
    </style>
  );

  return {
    theme: { ...defaultTheme, ...cssOverride },
    html,
  };
}
