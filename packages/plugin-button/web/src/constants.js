export const BUTTON_TYPE = 'wix-draft-plugin-button';
export const ALIGN_CENTER = 'center';
export const settingsTabValue = 'settings';
export const designTabValue = 'design';
export const BUTTON_TYPES = ['primary', 'secondary'];
export const DEFAULT_PALETTE = ['#FEFDFD', '#D5D4D4', '#000000', '#ABCAFF', '#81B0FF', '#0261FF'];
export const DEFAULT_COLOR = '#000000';
export const DEFAULT_SELECTION_COLOR = '#000000';
export const COLOR_PICKER_TYPE = Object.freeze({
  TEXT_COLOR: 'textColor',
  BORDER_COLOR: 'borderColor',
  BACKGROUND_COLOR: 'backgroundColor',
});

export const COLORS = Object.freeze({
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
});

export const DEFAULT_CONFIG = {
  alignment: ALIGN_CENTER,
  size: 'small',
  width: 'fit-content',
};

export const getDefaultComponentData = (rel, target) => {
  return {
    config: DEFAULT_CONFIG,
    button: {
      settings: {
        buttonText: 'Click Me',
        url: '',
        rel,
        target,
      },
      design: {
        activeButton: 0,
        borderRadius: 0,
        borderWidth: 0,
        padding: 12,
        background: COLORS.color8,
        color: COLORS.color1,
        borderColor: COLORS.color8,
      },
    },
  };
};

export const buttonPreviews = colors => [
  {
    className: 'button_primary',
    border: '0px solid #' + colors.color8,
    borderRadius: '0px',
    borderWidth: '0px',
    background: colors.color8,
    color: colors.color1,
    borderColor: colors.color8,
  },
  {
    className: 'button_secondary',
    border: '1px solid ' + colors.color8,
    borderRadius: '0px',
    borderWidth: '1px',
    background: colors.color1,
    color: colors.color8,
    borderColor: colors.color8,
  },
  {
    className: 'button_secondary',
    border: '1px solid ' + colors.color8,
    borderRadius: '0px',
    borderWidth: '1px',
    background: colors.color7,
    color: colors.color8,
    borderColor: colors.color8,
  },
  {
    className: 'button_secondary',
    border: '1px solid ' + colors.color8,
    borderRadius: '10px',
    borderWidth: '1px',
    background: colors.color7,
    color: colors.color8,
    borderColor: colors.color8,
  },
  {
    className: 'button_secondary',
    border: '1px solid ' + colors.color8,
    borderWidth: '5px',
    borderRadius: '0px',
    background: colors.color1,
    color: colors.color8,
    borderColor: colors.color8,
  },
];
