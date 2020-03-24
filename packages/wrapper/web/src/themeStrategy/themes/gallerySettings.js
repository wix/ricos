/* eslint-disable camelcase */
import { adaptForeground, hexToRgbA } from './themeUtils';

export default function gallerySettings(colors) {
  const actionColor = adaptForeground(colors.actionColor);
  const sliderTrack = { background: `${actionColor} !important` };
  const thumb = { ...sliderTrack, border: `4px solid ${actionColor}` };
  return {
    //gallery-items-sortable.scss
    itemContainer: {
      '&.itemContainerSelected': {
        boxShadow: `0 0 0 3px ${actionColor}`,
      },
    },
    itemContainerSelected: {},

    //image-ratio-selector.scss
    imageRatioSelector_grid: {
      'grid-template-columns': 'auto auto auto auto auto',
      'grid-template-rows': '72px',
      'row-gap': '12px',
      'column-gap': '4px',
    },
    imageRatioSelector_ratioButton_selected: {
      backgroundColor: `${actionColor} !important`,
    },
    imageRatioSelector_tile: {
      margin: '0 !important',
    },

    //layout-selector.scss
    layoutsSelector_grid: {
      'grid-template-rows': '85px 85px',
      'grid-template-columns': '90px 90px 90px 90px',
      'row-gap': '12px',
      'column-gap': '4px',
    },
    layoutsSelector_tile: {
      display: null,
    },
    layoutsSelector_tile_label: {
      marginTop: '2px',
    },
    layoutsSelector_icon_selected: {
      color: adaptForeground(actionColor),
    },

    //thumbnail-placement-selector.rtlignore.scss
    thumbnailPlacementSelector_icon_selected: {
      color: actionColor,
    },
    thumbnailPlacementSelector_grid: {
      'row-gap': '12px',
      'column-gap': '4px',
      'grid-template-columns': '90px 90px 90px 90px',
    },

    //selection-list.scss
    selectionListOption: {
      width: '100%',
      height: '85px',
      margin: '0 ',
      textAlign: 'center',
      display: 'inline-flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      '&:hover': {
        backgroundColor: hexToRgbA(actionColor, 0.05),
      },
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

    //tabs.scss
    tabs_panel: {
      padding: '24px 24px 30px !important',
    },
    tabs_headers_option_selected: {
      borderBottom: `solid 3px ${actionColor} !important`,
    },

    //button.scss
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
