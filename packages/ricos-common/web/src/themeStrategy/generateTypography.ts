import { CssVarsObject, RicosTheme } from './themeTypes';

export default function createTypography(typography: RicosTheme['typography']): CssVarsObject {
  if (!typography) {
    return {};
  }
  const { fontFamily } = typography;
  return {
    fontFamily,
  };
}
