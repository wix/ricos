import { DecreaseIndentButton, IncreaseIndentButton } from './IndentButtons';

const createToolbar: CreatePluginToolbar = ({ isMobile }) => {
  return {
    TextButtonMapper: () => ({
      decreaseIndent: {
        component: DecreaseIndentButton,
        isMobile,
        group: {
          desktop: 2,
          mobile: 2,
        },
      },
      increaseIndent: {
        component: IncreaseIndentButton,
        isMobile,
        group: {
          desktop: 2,
          mobile: 2,
        },
      },
    }),
    name: 'indent',
  };
};

export default createToolbar;
