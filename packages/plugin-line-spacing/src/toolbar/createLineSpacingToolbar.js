import LineSpacingButton from './LineSpacingButton';
import { decorateComponentWithProps } from 'wix-rich-content-common/src';

export default settings => ({
  TextButtonMapper: () => ({
    LinsSpacing: {
      component: decorateComponentWithProps(LineSpacingButton, settings),
      isMobile: true,
      position: {
        mobile: 7,
      },
    },
  }),
});
