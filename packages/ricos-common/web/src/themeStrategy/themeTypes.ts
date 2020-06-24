type RicosCssOverride = RichContentTheme;

interface ThemeGeneratorFunction {
  (colors: PaletteColors, utils: ThemeUtils): Record<string, unknown>;
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

type Palette = Color[];
interface PaletteColors {
  actionColor: string;
  bgColor: string;
  textColor: string;
  secondaryColor: string;
  color7: string;
  color4: string;
}

type PalettePreset = 'darkTheme';
