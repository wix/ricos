import React from 'react';
import ThemeGenerator from './ThemeGenerator';
import { defaultTheme } from './defaults';
import { ThemeStrategyArgs, ThemeStrategyResult } from './themeTypes';
import { isDefined } from 'ts-is-present';

/**
 * Adds a parent className to separate styles for multiple instances of RicosEditor / RicosViewer, creating
 * a different scope for each css-variable
 * @param cssString Style object in a string format, containing the css variables
 * @param parentClass The parent's className that wraps the editor / viewer
 */
const addParentClass = (cssString: string, parentClass: string): string =>
  cssString
    .split('\n')
    .map(line => (line.trim().startsWith('*') ? `.${parentClass} ${line.trim().substr(1)}` : line))
    .join('\n');

export default function themeStrategy(args: ThemeStrategyArgs): ThemeStrategyResult {
  const { ricosTheme = {}, isViewer, plugins = [], cssOverride = {} } = args;
  const themeGeneratorFunctions = plugins.map(plugin => plugin.theme).filter(isDefined);
  let cssVars = '',
    typographyVars = '';
  const { palette, typography } = ricosTheme;
  if (palette) {
    const { palette, parentClass } = ricosTheme;
    const themeGenerator = new ThemeGenerator(isViewer, palette, themeGeneratorFunctions);
    const styleString = themeGenerator.getStylesString();
    cssVars = parentClass ? addParentClass(styleString, parentClass) : styleString;
  }

  const html = (
    <style type="text/css" key={'styleElement'}>
      {cssVars}
      {typographyVars}
    </style>
  );

  return {
    theme: { ...defaultTheme, ...cssOverride },
    html,
  };
}
