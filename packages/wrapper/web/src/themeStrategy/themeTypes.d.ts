interface ThemeGeneratorFunction {
  (colors: object, utils: object): object;
}

interface ThemeProperties {
  theme: string;
  palette?: Palette;
  themeGenerators?: ThemeGeneratorFunction[];
}

interface ObjectThemeProperties {
  theme: object;
}

interface Color {
  name: string;
  reference: string;
  value: string;
}

type Palette = Color[];
