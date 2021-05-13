import { CustomTextualStyle, RicosCustomStyles } from 'wix-rich-content-common';
import { CssVarsObject } from '../themeTypes';

/**
 * Sets `lineHeight` to `1.5` when `fontSize` is provided without `lineHeight`.
 * @param param0 CustomTextualStyle element
 */
const lineHeightFix = ({
  lineHeight,
  fontSize,
  ...rest
}: CustomTextualStyle): CustomTextualStyle => ({
  ...rest,
  fontSize,
  lineHeight: lineHeight || (fontSize !== undefined ? 1.5 : undefined),
});

const toVars = (customStyles: RicosCustomStyles) =>
  Object.entries(customStyles).reduce(
    (prev, [fieldName, customStyle]) => ({
      ...prev,
      ...Object.entries(lineHeightFix(customStyle)).reduce(
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
