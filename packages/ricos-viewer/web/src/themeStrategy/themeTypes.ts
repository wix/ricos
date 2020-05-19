type Theme = {
  modalTheme: { content: any };
  [propName: string]: any;
};

interface ThemeGeneratorFunction {
  (colors: PaletteColors, utils: ThemeUtils): object;
}

interface ThemeProperties {
  theme?: object;
  palette?: Palette | PalettePreset;
  themeGenerators?: ThemeGeneratorFunction[];
}

interface ThemeUtils {
  fallbackColor: string;
  fallbackColorBright: string;
  isBright: (hexColor: string) => boolean;
  adaptForeground: (actionColor: string) => string;
  hexToRgbA: (hexColor: string, opacity: number) => string;
}

interface PropertiesWithPalette extends ThemeProperties {
  palette: Palette | PalettePreset;
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
