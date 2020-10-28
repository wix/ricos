import { CssVarsObject, RicosCustomTheme, CustomTextualStyle } from '../themeTypes';

const toEntries = (customs: RicosCustomTheme): [string, CustomTextualStyle][] =>
  Object.entries(customs);

const toVars = (customs: RicosCustomTheme) =>
  toEntries(customs).reduce(
    (prev, [fieldName, customStyle]) => ({
      ...prev,
      [`custom-${fieldName.toLowerCase()}FontFamily`]: customStyle.fontFamily,
      [`custom-${fieldName.toLowerCase()}FontSize`]: customStyle.fontSize,
      [`custom-${fieldName.toLowerCase()}FontStyle`]: customStyle.fontStyle,
      [`custom-${fieldName.toLowerCase()}FontWeight`]: customStyle.fontWeight,
      [`custom-${fieldName.toLowerCase()}LineHeight`]: customStyle.lineHeight,
      [`custom-${fieldName.toLowerCase()}MinHeight`]: customStyle.minHeight,
      [`custom-${fieldName.toLowerCase()}TextDecoration`]: customStyle.textDecoration,
      [`custom-${fieldName.toLowerCase()}Color`]: customStyle.color,
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
