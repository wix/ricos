import { PalettePreset } from 'ricos-common';
import { PaletteColors } from 'wix-rich-content-common';

const darkTheme: PaletteColors = {
  textColor: '#000000',
  bgColor: '#FFFFFF',
  actionColor: '#15E0FB',
};

const presets: { [propName in PalettePreset]: PaletteColors } = {
  darkTheme,
};

export default presets;
