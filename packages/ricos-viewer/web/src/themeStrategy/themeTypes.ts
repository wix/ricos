type RicosCssOverride = {
  modalTheme?: { content?: any; overlay?: any };
  [propName: string]: any;
};

interface ThemeGeneratorFunction {
  (colors: PaletteColors, utils: ThemeUtils): object;
}

interface ThemeUtils {
  fallbackColor: string;
  fallbackColorBright: string;
  isBright: (hexColor: string) => boolean;
  adaptForeground: (actionColor: string) => string;
  hexToRgbA: (hexColor: string, opacity: number) => string;
}

interface Color {
  name: string;
  reference: string;
  value: string;
}

type Palette = [Color, ...Color[]];
interface PaletteColors {
  actionColor: string;
  bgColor: string;
  textColor: string;
  secondaryColor: string;
  color7: string;
  color4: string;
}

type PalettePreset = 'darkTheme';
