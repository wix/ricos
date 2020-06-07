import { DecreaseIndentButton, IncreaseIndentButton } from './IndentButtons';

export default function createToolbar({ isMobile }) {
  return {
    TextButtonMapper: () => ({
      decreaseIndent: {
        component: DecreaseIndentButton,
        isMobile,
        position: { desktop: 2, mobile: 0 },
        group: {
          desktop: 4,
          mobile: 2,
        },
      },
      increaseIndent: {
        component: IncreaseIndentButton,
        isMobile,
        position: { desktop: 3, mobile: 1 },
        group: {
          desktop: 4,
          mobile: 2,
        },
      },
    }),
    name: 'indent',
  };
}
