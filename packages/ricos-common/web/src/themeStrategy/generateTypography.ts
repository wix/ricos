import { CssVarsObject, RicosTheme, WixTypography, WixTypographyDefinition } from './themeTypes';

const toEntries = (wixTypography: WixTypography): [string, WixTypographyDefinition][] =>
  Object.entries(wixTypography);

export default function createTypography(typography: RicosTheme['typography']): CssVarsObject {
  if (!typography) {
    return {};
  }
  const { fontFamily, wixTypography } = typography;
  const wixTypographyVars = toEntries(wixTypography).reduce(
    (prev, curr) => ({
      ...prev,
      [`font-${curr[0]}`]: curr[1].value,
    }),
    {}
  );
  return {
    fontFamily,
    ...wixTypographyVars,
  };
}
