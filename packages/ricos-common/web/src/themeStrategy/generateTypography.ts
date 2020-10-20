import { CssVarsObject, RicosTheme, WixTypography, WixTypographyDefinition } from './themeTypes';

const toEntries = (wixTypography: WixTypography): [string, WixTypographyDefinition][] =>
  Object.entries(wixTypography);

const toVars = (wixTypography?: WixTypography) =>
  wixTypography
    ? toEntries(wixTypography).reduce(
        (prev, curr) => ({
          ...prev,
          [`font-${curr[0]}`]: curr[1].value,
        }),
        {}
      )
    : {};

export default function createTypography(typography?: RicosTheme['typography']): CssVarsObject {
  if (!typography) {
    return {};
  }
  const { fontFamily, wixTypography } = typography;
  const wixTypographyVars: CssVarsObject = toVars(wixTypography);
  return Object.assign(wixTypographyVars, fontFamily && { fontFamily });
}
