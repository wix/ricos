import SpoilerButton from './SpoilerButton';

export default function createToolbar() {
  return {
    TextButtonMapper: () => ({
      spoiler: {
        component: SpoilerButton,
        isMobile: true,
        position: { desktop: 0, mobile: 3 },
        group: {
          desktop: 5,
          mobile: 2,
        },
      },
    }),
    name: 'spoiler',
  };
}
