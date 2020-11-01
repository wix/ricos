import { CssVarsObject, RicosCustomTheme, CustomTextualStyle } from '../themeTypes';

const toEntries = (customStyles: RicosCustomTheme): [string, CustomTextualStyle][] =>
  Object.entries(customStyles);

const toVars = (customStyles: RicosCustomTheme) =>
  toEntries(customStyles).reduce(
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

export default function createCustomStyles(customStyles?: RicosCustomTheme): CssVarsObject {
  if (!customStyles) {
    return {};
  }
  const customsVars: CssVarsObject = customStyles ? toVars(customStyles) : {};
  return customsVars;
}
