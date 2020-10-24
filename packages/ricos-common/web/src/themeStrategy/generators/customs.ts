import { CssVarsObject, RicosCustomTheme, CustomTextualStyle } from '../themeTypes';

const toEntries = (customs: RicosCustomTheme): [string, CustomTextualStyle][] =>
  Object.entries(customs);

const toVars = (customs: RicosCustomTheme) =>
  toEntries(customs).reduce(
    (prev, [fieldName, { font, color }]) => ({
      ...prev,
      [`custom-${fieldName.toLowerCase()}-font`]: font,
      [`custom-${fieldName.toLowerCase()}-color`]: color,
    }),
    {}
  );

export default function createCustoms(customs?: RicosCustomTheme): CssVarsObject {
  if (!customs) {
    return {};
  }
  const customsVars: CssVarsObject = customs ? toVars(customs) : {};
  return customsVars;
}
