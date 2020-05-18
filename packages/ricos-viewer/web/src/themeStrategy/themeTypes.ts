type Theme = {
  modalTheme: { content: any };
  [propName: string]: any;
};

interface ThemeGeneratorFunction {
  (colors: PaletteColors, utils: ThemeUtils): object;
}

interface ThemeProperties {
  theme?: string | object;
  palette?: Palette;
  themeGenerators?: ThemeGeneratorFunction[];
}

interface ThemeUtils {
  fallbackColor: string;
  fallbackColorBright: string;
  isBright: (hexColor: string) => boolean;
  adaptForeground: (actionColor: string) => string;
  hexToRgbA: (hexColor: string, opacity: number) => string;
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
interface PaletteColors {
  actionColor: string;
  bgColor: string;
  textColor: string;
  secondaryColor: string;
  color7: string;
  color4: string;
}
