import React from 'react';
import ThemeGenerator from './ThemeGenerator';
import { defaultTheme } from './defaults';
import {
  PalettePreset,
  Palette,
  RicosCssOverride,
  ThemeStrategyArgs,
  ThemeStrategyResult,
  RicosTheme,
} from 'ricos-common';
import { isDefined } from 'ts-is-present';

interface ThemeState {
  rawCss?: string;
  cssVars?: string;
  prevPalette?: Palette | PalettePreset;
}

const addParentClass = (cssString: string, parentClass: string): string =>
  cssString
    .split('\n')
    .map(line => (line.startsWith('.') || line.startsWith('*') ? `.${parentClass} ${line}` : line))
    .join('\n');

function themeStrategy(
  themeState: ThemeState,
  args: ThemeStrategyArgs,
  theme: RicosTheme
): ThemeStrategyResult {
  const { isViewer, plugins = [] } = args;
  const themeGeneratorFunctions = plugins.map(plugin => plugin.theme).filter(isDefined);
  const { palette, parentClass } = theme;
  if (themeState.prevPalette !== palette || !themeState.rawCss) {
    if (palette) {
      themeState.prevPalette = palette;
      const themeGenerator = new ThemeGenerator(isViewer, palette, themeGeneratorFunctions);
      const cssVars = themeGenerator.getStylesObject();
      themeState.cssVars = parentClass ? addParentClass(cssVars, parentClass) : cssVars;
    } else {
      themeState.rawCss = '';
      themeState.cssVars = '';
    }
  }
  const cssTheme: RicosCssOverride = {
    ...defaultTheme,
  };

  const html = (
    <style type="text/css" key={'styleElement2'}>
      {themeState.cssVars}
      {themeState.rawCss}
    </style>
  );

  return {
    theme: cssTheme,
    html,
  };
}

function createThemeStrategy(theme: RicosTheme) {
  const themeState: ThemeState = {};
  return (args: ThemeStrategyArgs) => themeStrategy(themeState, args, theme);
}

export function createTheme(theme: RicosTheme = {}) {
  return () => createThemeStrategy(theme);
}
