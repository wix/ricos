import classNames from 'classnames';
import createStaticToolbar from './createStaticToolbar';
import toolbarStyles from '../../../../statics/styles/footer-toolbar.scss';

const getFooterTheme = theme => {
  const {
    toolbarStyles: toolbarTheme,
    buttonStyles,
    separatorStyles: separatorTheme,
    ...rest
  } = theme || {};

  return {
    toolbarStyles: {
      toolbar: classNames(
        toolbarStyles.footerToolbar,
        toolbarTheme && toolbarTheme.footerToolbar,
      ),
      scrollableContainer: classNames(
        toolbarStyles.footerToolbar_scrollableContainer,
        toolbarTheme && toolbarTheme.footerToolbar_scrollableContainer
      ),
      buttons: classNames(
        toolbarStyles.footerToolbar_buttons,
        toolbarTheme && toolbarTheme.footerToolbar_buttons
      ),
      extend: classNames(
        toolbarStyles.footerToolbar_extend,
        toolbarTheme && toolbarTheme.footerToolbar_extend
      ),
      responsiveArrow: classNames(
        toolbarStyles.footerToolbar_responsiveArrow,
        toolbarTheme && toolbarTheme.footerToolbar_responsiveArrow
      ),
      responsiveArrowLeft: classNames(
        toolbarStyles.footerToolbar_responsiveArrowLeft,
        toolbarTheme && toolbarTheme.footerToolbar_responsiveArrowLeft
      ),
      responsiveArrowRight: classNames(
        toolbarStyles.footerToolbar_responsiveArrowRight,
        toolbarTheme && toolbarTheme.footerToolbar_responsiveArrowRight
      ),
      responsiveArrowLeft_icon: classNames( //eslint-disable-line camelcase
        toolbarStyles.footerToolbar_responsiveArrowLeft_icon,
        toolbarTheme && toolbarTheme.footerToolbar_responsiveArrowLeft_icon
      ),
      responsiveArrowRight_icon: classNames( //eslint-disable-line camelcase
        toolbarStyles.footerToolbar_responsiveArrowRight_icon,
        toolbarTheme && toolbarTheme.footerToolbar_responsiveArrowRight_icon
      ),
    },
    buttonStyles: {
      buttonWrapper: buttonStyles && buttonStyles.footerToolbarButton_wrapper,
      button: buttonStyles && buttonStyles.footerToolbarButton,
      icon: buttonStyles && buttonStyles.footerToolbarButton_icon,
    },
    separatorStyles: {
      separator: separatorTheme && separatorTheme.footerToolbarSeparator
    },
    ...rest
  };
};

export default ({ buttons, theme, offset, visibilityFn, displayOptions }) => {
  const footerTheme = getFooterTheme(theme);
  return createStaticToolbar({
    name: 'FooterToolbar',
    theme: footerTheme,
    structure: buttons,
    offset,
    visibilityFn,
    displayOptions
  });
};
