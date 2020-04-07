interface ThemeGeneratorFunction {
  (colors: object): object;
}

interface ThemeProperties {
  theme?: string;
  palette?: Palette;
  themeGenerators?: ThemeGeneratorFunction[];
}

interface ObjectThemeProperties extends ThemeProperties {
  theme?: object | string;
}

interface Color {
  name: string;
  reference: string;
  value: string;
}

type Palette = Color[];
