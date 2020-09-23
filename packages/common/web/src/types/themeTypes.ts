export interface ThemeUtils {
  fallbackColor: string;
  fallbackColorBright: string;
  isBright: (hexColor: string) => boolean;
  adaptForeground: (actionColor: string) => string;
  toCssRgbA: (hexColor: string, opacity: number) => string;
}

export interface PaletteColors {
  actionColor: string;
  bgColor: string;
  textColor: string;
}
