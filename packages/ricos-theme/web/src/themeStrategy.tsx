import React from 'react';
import ThemeGenerator from './ThemeGenerator';
import { defaultTheme } from './defaults';
import { ThemeStrategyArgs, ThemeStrategyResult, RicosTheme } from 'ricos-common';
import { isDefined } from 'ts-is-present';

const addParentClass = (cssString: string, parentClass: string): string =>
  cssString
    .split('\n')
    .map(line => (line.startsWith('.') || line.startsWith('*') ? `.${parentClass} ${line}` : line))
    .join('\n');

function themeStrategy(args: ThemeStrategyArgs, theme: RicosTheme): ThemeStrategyResult {
  const { isViewer, plugins = [], cssOverride = {} } = args;
  const themeGeneratorFunctions = plugins.map(plugin => plugin.theme).filter(isDefined);
  const { palette, parentClass } = theme;
  let cssVars = '';
  if (palette) {
    const themeGenerator = new ThemeGenerator(isViewer, palette, themeGeneratorFunctions);
    const styleString = themeGenerator.getStylesString();
    cssVars = parentClass ? addParentClass(styleString, parentClass) : styleString;
  }

  const html = (
    <style type="text/css" key={'styleElement2'}>
      {cssVars}
    </style>
  );

  return {
    theme: { ...defaultTheme, ...cssOverride },
    html,
  };
}

export function createTheme(theme: RicosTheme) {
  return (args: ThemeStrategyArgs) => themeStrategy(args, theme);
}
