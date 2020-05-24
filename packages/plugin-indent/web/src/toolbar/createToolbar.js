import { decreaseIndentButton, increaseIndentButton } from './IndentButtons';

export default function createToolbar({ isMobile }) {
  return {
    TextButtonMapper: () => ({
      decreaseIndent: {
        component: decreaseIndentButton,
        isMobile,
        group: {
          desktop: 2,
          mobile: 2,
        },
      },
      increaseIndent: {
        component: increaseIndentButton,
        isMobile,
        group: {
          desktop: 2,
          mobile: 2,
        },
      },
    }),
    name: 'indent',
  };
}
