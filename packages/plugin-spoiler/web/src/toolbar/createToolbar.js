import SpoilerButton from './SpoilerButton';

export default function createToolbar() {
  return {
    TextButtonMapper: () => ({
      spoiler: {
        component: SpoilerButton,
        isMobile: true,
        group: {
          desktop: 3,
          mobile: 3,
        },
      },
    }),
    name: 'spoiler',
  };
}
