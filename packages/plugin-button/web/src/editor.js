import { createButtonPlugin } from './createButtonPlugin';
import { BUTTON_TYPE } from './constants';
import { ModalsMap } from './modals';
//import 'wix-rich-content-plugin-button/dist/styles.min.css';

const buttonDefaultPalette = ['#FEFDFD', '#D5D4D4', '#ABCAFF', '#81B0FF', '#0261FF', '#0141AA'];
let userButtonTextColors = [...buttonDefaultPalette];
let userButtonBackgroundColors = [...buttonDefaultPalette];
let userButtonBorderColors = [...buttonDefaultPalette];
const defaultConfig = {
  //   toolbar: {
  //     icons: {
  //       Button: MyCustomIcon, // insert plugin icon
  //     },
  //   },
  palette: ['#FEFDFD', '#D5D4D4', '#ABCAFF', '#81B0FF', '#0261FF', '#0141AA'],
  selectionBackgroundColor: 'fuchsia',
  selectionBorderColor: '#FFF',
  selectionTextColor: '#FFF',
  colors: {
    color1: '#FEFDFD',
    color2: '#D5D4D4',
    color3: '#000000',
    color4: '#000000',
    color5: '#000000',
    color6: '#ABCAFF',
    color7: '#81B0FF',
    color8: '#0261FF',
    color9: '#0141AA',
    color10: '#012055',
  },
  onTextColorAdded: color => (userButtonTextColors = [color, ...userButtonTextColors]),
  onBackgroundColorAdded: color =>
    (userButtonBackgroundColors = [color, ...userButtonBackgroundColors]),
  onBorderColorAdded: color => (userButtonBorderColors = [color, ...userButtonBorderColors]),
  getTextColors: () => userButtonTextColors,
  getBorderColors: () => userButtonBorderColors,
  getBackgroundColors: () => userButtonBackgroundColors,
};

export const pluginButton = (config = {}) => {
  return {
    config: { ...defaultConfig, ...config },
    type: BUTTON_TYPE,
    createPlugin: createButtonPlugin, //image gallery divider html
    ModalsMap,
    // palleteColors: palette => ({
    //   buttonColor: palette.actionColor,
    // }),
  };
};
