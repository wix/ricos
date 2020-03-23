/* eslint-disable camelcase */
const getBrightness = hexCode => {
  // return between 0-255
  // strip off any leading #
  const _hexCode = hexCode.replace('#', '');

  const r = parseInt(_hexCode.substr(0, 2), 16);
  const g = parseInt(_hexCode.substr(2, 2), 16);
  const b = parseInt(_hexCode.substr(4, 2), 16);

  return (r * 299 + g * 587 + b * 114) / 1000;
};

const fallbackColor = '#000000';

const getForegroundColor = actionColor => {
  // if action color is dark enough, choose it. else - white.
  //return getBrightness(actionColor) < 255 / 2 ? actionColor : '#000000';
  return getBrightness(actionColor) < 140 ? actionColor : fallbackColor;
};

function hexToRgbA(hex, opacity) {
  let c;
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    c = hex.substring(1).split('');
    if (c.length === 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    c = '0x' + c.join('');
    // eslint-disable-next-line no-bitwise
    return 'rgba(' + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') + `,${opacity || 1})`;
  }
  throw new Error('Bad Hex');
}

export default function gallerySettings(colors) {
  const actionColor = getForegroundColor(colors.actionColor);
  const sliderTrack = { background: `${actionColor} !important` };
  const thumb = { ...sliderTrack, border: `4px solid ${actionColor}` };
  //const isFallback = actionColor === fallbackColor;
  return {
    itemContainerSelected: {
      boxShadow: `0 0 0 3px ${actionColor} !important`,
    },
    layoutsSelector_icon_selected: {
      color: getForegroundColor(actionColor),
    },
    imageRatioSelector_ratioButton_selected: {
      backgroundColor: `${actionColor} !important`,
    },

    tabs_panel: {
      padding: '24px 24px 30px',
    },
    layoutsSelector_grid: {
      'grid-template-rows': 'auto auto',
      'row-gap': '12px',
      'column-gap': '4px',
    },
    layoutsSelector_tile: {
      display: null,
    },
    layoutsSelector_tile_label: {
      marginTop: '2px',
    },
    selectionListOption_selected: {
      color: actionColor,
      '&$selectionListOption': {
        backgroundColor: hexToRgbA(actionColor, 0.08),
      },
      '&$selectionListOption:hover': {
        backgroundColor: hexToRgbA(actionColor, 0.08),
      },
    },
    thumbnailPlacementSelector_icon_selected: {
      color: actionColor,
    },
    thumbnailPlacementSelector_grid: {
      'row-gap': '12px',
      'column-gap': '4px',
    },
    selectionListOption: {
      width: '90px',
      height: '85px',
      margin: '0',
      textAlign: 'center',
      display: 'inline-flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      '&:hover': {
        backgroundColor: hexToRgbA(actionColor, 0.05),
      },
    },
    tabs_headers_option_selected: {
      borderBottom: `solid 3px ${actionColor} !important`,
    },
    button_primary: {
      background: `${actionColor} !important`,
    },
    button_secondary: {
      color: actionColor,
      borderColor: `${actionColor} !important`,
      '&:hover': {
        color: actionColor,
      },
    },

    //slider.scss
    slider: {
      '&::-webkit-slider-runnable-track': sliderTrack,
      '&::-webkit-slider-thumb': thumb,
    },

    //radio-group.scss
    radioGroup_button: {
      border: `1px solid ${actionColor} !important`,
    },

    radioGroup_input: {
      '&:checked + $radioGroup_button': {
        '&::after': {
          backgroundColor: `${actionColor} !important`,
        },
      },
    },
  };
}
