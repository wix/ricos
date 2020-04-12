import PrevIndentButton from './PrevIndentButton';
import NextIndentButton from './NextIndentButton';

// eslint-disable-next-line no-unused-vars
export default function createToolbar({ helpers, t, settings, isMobile }) {
  return {
    TextButtonMapper: () => ({
      PrevIndent: {
        component: PrevIndentButton,
        isMobile,
        position: {
          desktop: 11,
        },
      },
      NextIndent: {
        component: NextIndentButton,
        isMobile,
        position: {
          desktop: 12,
        },
      },
    }),
    name: 'indent',
  };
}
