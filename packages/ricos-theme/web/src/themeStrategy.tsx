import React from 'react';
import ThemeGenerator from './ThemeGenerator';
import jss, { SheetsRegistry, Classes } from 'jss';
import preset from 'jss-preset-default';
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

jss.setup(preset());

interface ThemeState {
  rawCss?: string;
  prevPalette?: Palette | PalettePreset;
  paletteClasses?: Classes;
}

const addParentClass = (rawCss: string, parentClass: string): string =>
  rawCss
    .split('\n')
    .map(line => (line.startsWith('.') ? `.${parentClass} ${line}` : line))
    .join('\n');

function themeStrategy(
  themeState: ThemeState,
  args: ThemeStrategyArgs,
  theme: RicosTheme
): ThemeStrategyResult {
  const { isViewer, plugins = [] } = args;
  const themeGeneratorFunctions = plugins.map(plugin => plugin.theme).filter(isDefined);
  const { palette, parentClass } = theme;
  const sheets = new SheetsRegistry();
  if (themeState.prevPalette !== palette || !themeState.rawCss) {
    if (palette) {
      themeState.prevPalette = palette;
      const themeGenerator = new ThemeGenerator(isViewer, palette, themeGeneratorFunctions);
      const sheet = jss.createStyleSheet(themeGenerator.getStylesObject());
      sheets.add(sheet);
      const rawCss = sheets.toString();
      themeState.paletteClasses = sheet.classes;
      themeState.rawCss = parentClass ? addParentClass(rawCss, parentClass) : rawCss;
    } else {
      themeState.paletteClasses = {};
      themeState.rawCss = '';
    }
  }
  const cssTheme: RicosCssOverride = {
    ...defaultTheme,
    ...themeState.paletteClasses,
  };

  const html = (
    <style type="text/css" key={'styleElement'}>
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
  return args => themeStrategy(themeState, args, theme);
}

export default function createThemeStrategyWithTheme(theme: RicosTheme = {}) {
  return () => createThemeStrategy(theme);
}
