import TextColorButton from './TextColorButton';
import TextHighlightButton from './TextHighlightButton';

export const createTextColorToolbar = () => ({
  TextButtonMapper: () => ({
    TextColor: {
      component: TextColorButton,
      isMobile: true,
      position: { desktop: 5, mobile: 5 },
      group: { desktop: 0, mobile: 0 },
    },
  }),
});

export const createTextHighlightToolbar = () => ({
  TextButtonMapper: () => ({
    TextHighlight: {
      component: TextHighlightButton,
      isMobile: true,
      position: { desktop: 6, mobile: 6 },
      group: { desktop: 0, mobile: 0 },
    },
  }),
});
