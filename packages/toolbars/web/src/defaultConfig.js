import { TOOLBARS, FORMATTING_BUTTONS } from 'wix-rich-content-editor-common';

export const defaultFormattingToolbarConfig = {
  name: TOOLBARS.FORMATTING,
  shouldCreate: () => ({ desktop: true, mobile: { android: true, ios: true } }),
  getButtons: () => {
    const desktopButtons = [
      FORMATTING_BUTTONS.HEADINGS,
      '|',
      FORMATTING_BUTTONS.BOLD,
      FORMATTING_BUTTONS.ITALIC,
      FORMATTING_BUTTONS.UNDERLINE,
      FORMATTING_BUTTONS.TEXT_COLOR,
      FORMATTING_BUTTONS.TEXT_HIGHLIGHT,
      FORMATTING_BUTTONS.TITLE,
      FORMATTING_BUTTONS.BLOCKQUOTE,
      '|',
      {
        tooltipKey: 'AlignTextDropdownButton_Tooltip',
        name: 'Alignment',
        dataHook: 'Alignment',
        buttons: [
          FORMATTING_BUTTONS.ALIGN_LEFT,
          FORMATTING_BUTTONS.ALIGN_CENTER,
          FORMATTING_BUTTONS.ALIGN_RIGHT,
          FORMATTING_BUTTONS.ALIGN_JUSTIFY,
        ],
      },
      FORMATTING_BUTTONS.ORDERED_LIST,
      FORMATTING_BUTTONS.UNORDERED_LIST,
      FORMATTING_BUTTONS.DECREASE_INDENT,
      FORMATTING_BUTTONS.INCREASE_INDENT,
      '|',
      FORMATTING_BUTTONS.LINE_SPACING,
      FORMATTING_BUTTONS.LINK,
      FORMATTING_BUTTONS.CODE_BLOCK,
    ];

    const mobileButtons = [
      FORMATTING_BUTTONS.BOLD,
      FORMATTING_BUTTONS.ITALIC,
      FORMATTING_BUTTONS.UNDERLINE,
      FORMATTING_BUTTONS.TEXT_COLOR,
      FORMATTING_BUTTONS.LINE_SPACING,
    ];
    return {
      desktop: desktopButtons,
      mobile: {
        android: mobileButtons,
        ios: mobileButtons,
      },
    };
  },
};
