export interface ThemeUtils {
  fallbackColor: string;
  fallbackColorBright: string;
  isBright: (hexColor: string) => boolean;
  adaptForeground: (actionColor: string) => string;
  hexToRgbA: (hexColor: string, opacity: number) => string;
}

export interface PaletteColors {
  actionColor: string;
  bgColor: string;
  textColor: string;
  secondaryColor: string;
  color7: string;
  color4: string;
}
