interface ThemeGeneratorFunction {
  (colors: any, utils: any): any;
}

interface ThemeProperties {
  theme?: string;
  palette?: Palette;
  themeGenerators?: ThemeGeneratorFunction[];
}

interface ObjectThemeProperties {
  theme?: object | string;
}

interface Color {
  name: string;
  reference: string;
  value: string;
}

type Palette = Color[];
