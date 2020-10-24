import { CssVarsObject, RicosCustomTheme, CustomTextualStyle } from '../themeTypes';

const toEntries = (customs: RicosCustomTheme): [string, CustomTextualStyle][] =>
  Object.entries(customs);

const toVars = (customs: RicosCustomTheme) =>
  toEntries(customs).reduce(
    (prev, curr) => ({
      ...prev,
      [`custom-${curr[0].toLowerCase()}-font`]: curr[1].font,
      [`custom-${curr[0].toLowerCase()}-color`]: curr[1].color,
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
