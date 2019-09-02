import TextColorButton from './TextColorButton';

export default () => ({
  TextButtonMapper: () => ({
    TextColor: {
      component: TextColorButton,
      isMobile: true,
      position: { desktop: 3, mobile: 3 },
    },
  }),
});
