import { CssVarsObject, RicosCustomStyles } from '../themeTypes';

const toVars = (customStyles: RicosCustomStyles) =>
  Object.entries(customStyles).reduce(
    (prev, [fieldName, customStyle]) => ({
      ...prev,
      ...Object.entries(customStyle).reduce(
        (prevStyle, styleName) => ({
          ...prevStyle,
          [`custom-${fieldName.toLowerCase()}-${styleName[0]}`]: styleName[1],
        }),
        {}
      ),
    }),
    {}
  );

export default function createCustomStyles(customStyles?: RicosCustomStyles): CssVarsObject {
  if (!customStyles) {
    return {};
  }
  const customsVars: CssVarsObject = customStyles ? toVars(customStyles) : {};
  return customsVars;
}
