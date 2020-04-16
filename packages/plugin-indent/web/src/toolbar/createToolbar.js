import PrevIndentButton from './PrevIndentButton';
import NextIndentButton from './NextIndentButton';

export default function createToolbar({ isMobile }) {
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
