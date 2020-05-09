import { DecreaseIndentButton, IncreaseIndentButton } from './IndentButtons';

export default function createToolbar({ isMobile }) {
  return {
    TextButtonMapper: () => ({
      decreaseIndent: {
        component: DecreaseIndentButton,
        isMobile,
        group: {
          desktop: 1,
          mobile: 1,
        },
      },
      increaseIndent: {
        component: IncreaseIndentButton,
        isMobile,
        group: {
          desktop: 1,
          mobile: 1,
        },
      },
    }),
    name: 'indent',
  };
}
