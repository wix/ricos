import TextColorButton from './TextColorButton';

export default () => ({
  TextButtonMapper: () => ({
    TextColor: {
      component: TextColorButton,
      isMobile: false,
      position: { desktop: 3 },
    },
  }),
});
