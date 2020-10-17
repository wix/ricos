import React from 'react';
import ThemeGenerator from './ThemeGenerator';
import typographyGenerator from './typographyGenerator';
import { defaultTheme } from './defaults';
import { createVars } from './themeUtils';
import { ThemeStrategyArgs, ThemeStrategyResult } from './themeTypes';
import { isDefined } from 'ts-is-present';

export default function themeStrategy(args: ThemeStrategyArgs): ThemeStrategyResult {
  const { ricosTheme = {}, isViewer, plugins = [], cssOverride = {} } = args;
  const themeGeneratorFunctions = plugins.map(plugin => plugin.theme).filter(isDefined);
  const { parentClass = '', palette, typography } = ricosTheme;

  let paletteVars = {},
    typographyVars = {};

  if (palette) {
    const themeGenerator = new ThemeGenerator(isViewer, palette, themeGeneratorFunctions);
    paletteVars = themeGenerator.getStylesString();
  }
  if (typography) {
    typographyVars = typographyGenerator(typography);
  }

  const html = (
    <style type="text/css" key={'styleElement'}>
      {createVars(parentClass, paletteVars, typographyVars)}
    </style>
  );

  return {
    theme: { ...defaultTheme, ...cssOverride },
    html,
  };
}
