interface ThemeGeneratorFunction {
  (colors: any, utils: any): any;
}

interface ThemeProperties {
  theme?: string | object;
  palette?: Palette;
  themeGenerators?: ThemeGeneratorFunction[];
}

interface StringThemeProperties extends ThemeProperties {
  theme?: string;
}

interface Color {
  name: string;
  reference: string;
  value: string;
}

type Palette = Color[];
