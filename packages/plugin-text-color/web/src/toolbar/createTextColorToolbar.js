import TextColorButton from './TextColorButton';
import TextHighlightButton from './TextHighlightButton';

export const createTextColorToolbar = () => ({
  TextButtonMapper: () => ({
    TextColor: {
      component: TextColorButton,
      isMobile: true,
      position: { desktop: 3, mobile: 3 },
      group: { desktop: 0, mobile: 0 },
    },
  }),
});

export const createTextHighlightToolbar = () => ({
  TextButtonMapper: () => ({
    TextHighlight: {
      component: TextHighlightButton,
      isMobile: true,
      position: { desktop: 4, mobile: 4 },
      group: { desktop: 0, mobile: 0 },
    },
  }),
});
