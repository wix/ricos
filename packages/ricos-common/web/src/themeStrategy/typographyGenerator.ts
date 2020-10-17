import { RicosTheme } from '../types';

export default function typographyGenerator(typography: RicosTheme['typography']) {
  if (!typography) return {};
  const { fontFamily } = typography;
  return {
    fontFamily,
  };
}
