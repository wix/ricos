import TextColorButton from './TextColorButton';
import TextHighlightButton from './TextHighlightButton';

export const createTextColorToolbar: CreatePluginToolbar = () => ({
  TextButtonMapper: () => ({
    TextColor: {
      component: TextColorButton,
      isMobile: true,
      position: { desktop: 2.1, mobile: 2.1 },
      group: { desktop: 1, mobile: 1 },
    },
  }),
  name: 'text-color',
});

export const createTextHighlightToolbar: CreatePluginToolbar = () => ({
  TextButtonMapper: () => ({
    TextHighlight: {
      component: TextHighlightButton,
      isMobile: true,
      position: { desktop: 2.2, mobile: 2.2 },
      group: { desktop: 1, mobile: 1 },
    },
  }),
  name: 'text-highlight',
});
