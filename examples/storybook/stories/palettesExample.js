/* eslint-disable no-unused-vars */
const TemplateExample = [
  {
    name: 'color_1',
    reference: 'white/black',
  },
  {
    name: 'color_2',
    reference: 'black/white',
  },
  {
    name: 'color_3',
    reference: 'primery-1',
  },
  {
    name: 'color_4',
    reference: 'primery-2',
  },
  {
    name: 'color_5',
    reference: 'primery-3',
  },
  {
    name: 'color_11',
    reference: 'color-1',
  },
  {
    name: 'color_12',
    reference: 'color-2',
  },
  {
    name: 'color_13',
    reference: 'color-3',
  },
  {
    name: 'color_14',
    reference: 'color-4',
  },
  {
    name: 'color_15',
    reference: 'color-5',
  },
  {
    name: 'color_16',
    reference: 'color-6',
  },
  {
    name: 'color_17',
    reference: 'color-7',
  },
  {
    name: 'color_18',
    reference: 'color-8',
  },
  {
    name: 'color_19',
    reference: 'color-9',
  },
  {
    name: 'color_20',
    reference: 'color-10',
  },
  {
    name: 'color_21',
    reference: 'color-11',
  },
  {
    name: 'color_22',
    reference: 'color-12',
  },
  {
    name: 'color_23',
    reference: 'color-13',
  },
  {
    name: 'color_24',
    reference: 'color-14',
  },
  {
    name: 'color_25',
    reference: 'color-15',
  },
  {
    name: 'color_26',
    reference: 'color-16',
  },
  {
    name: 'color_27',
    reference: 'color-17',
  },
  {
    name: 'color_28',
    reference: 'color-18',
  },
  {
    name: 'color_29',
    reference: 'color-19',
  },
  {
    name: 'color_30',
    reference: 'color-20',
  },
  {
    name: 'color_31',
    reference: 'color-21',
  },
  {
    name: 'color_32',
    reference: 'color-22',
  },
  {
    name: 'color_33',
    reference: 'color-23',
  },
  {
    name: 'color_34',
    reference: 'color-24',
  },
  {
    name: 'color_35',
    reference: 'color-25',
  },
];

const ricosPalettes = [
  {
    bgColor: '#FFFFFF',
    textColor: '#414141',
    actionColor: '#FA6400',
  },
  {
    bgColor: '#FFFFFF',
    textColor: '#111111',
    actionColor: '#8454FC',
  },
  {
    bgColor: '#F0FAFF',
    textColor: '#292F33',
    actionColor: '#00E689',
  },
  {
    bgColor: '#FFFFFF',
    textColor: '#000000',
    actionColor: '#EC5E87',
  },
  {
    bgColor: '#FFFFFF',
    textColor: '#093B31',
    actionColor: '#A35429',
  },
  {
    bgColor: '#FFFFFF',
    textColor: '#191919',
    actionColor: '#2A6049',
  },
  {
    bgColor: '#0E0A48',
    textColor: '#FFFFFF',
    actionColor: '#FF66F5',
  },
  {
    bgColor: '#0C172B',
    textColor: '#FFFFFF',
    actionColor: '#8CDA3F',
  },
  {
    bgColor: '#1C191C',
    textColor: '#D2CDD2',
    actionColor: '#FE6148',
  },
  {
    bgColor: '#0E092B',
    textColor: '#FFFFFF',
    actionColor: '#D6FF00',
  },
];

const baseToWixColors = ({ bgColor, textColor, actionColor }) => {
  const palette = new Array(30).fill('#FFFFFF');
  palette[5] = bgColor;
  palette[9] = textColor;
  palette[12] = actionColor;
  return palette;
};

const wixColors = ricosPalettes.map(baseToWixColors);

const paletteToWixPalette = palette =>
  palette.map((color, i) => ({ ...TemplateExample[i], value: color }));

const wixPalettes = wixColors.map(palette => paletteToWixPalette(palette));

export { wixPalettes, ricosPalettes };
