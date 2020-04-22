import TextColorButton from './TextColorButton';
import TextHighlightButton from './TextHighlightButton';

export const createTextColorToolbar = () => ({
  TextButtonMapper: () => ({
    TextColor: {
      component: TextColorButton,
      isMobile: true,
      position: { desktop: 2.1, mobile: 2.1 },
      group: { desktop: 0, mobile: 0 },
    },
  }),
});

export const createTextHighlightToolbar = () => ({
  TextButtonMapper: () => ({
    TextHighlight: {
      component: TextHighlightButton,
      isMobile: true,
      position: { desktop: 2.2, mobile: 2.2 },
      group: { desktop: 0, mobile: 0 },
    },
  }),
});
