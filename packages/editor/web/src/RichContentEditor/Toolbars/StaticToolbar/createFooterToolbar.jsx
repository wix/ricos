import classNames from 'classnames';
import createStaticToolbar from './createStaticToolbar';
import toolbarStyles from '../../../../statics/styles/footer-toolbar.scss';

const getFooterTheme = theme => {
  const { toolbarStyles: toolbarTheme, buttonStyles, separatorStyles: separatorTheme, ...rest } =
    theme || {};

  /* eslint-disable camelcase*/
  return {
    toolbarStyles: {
      toolbar: classNames(toolbarStyles.footerToolbar, toolbarTheme && toolbarTheme.footerToolbar),
      staticToolbar: theme.staticToolbar,
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
      responsiveArrowStart: classNames(
        toolbarStyles.footerToolbar_responsiveArrowStart,
        toolbarTheme && toolbarTheme.footerToolbar_responsiveArrowStart
      ),
      responsiveArrowEnd: classNames(
        toolbarStyles.footerToolbar_responsiveArrowEnd,
        toolbarTheme && toolbarTheme.footerToolbar_responsiveArrowEnd
      ),
      responsiveArrowStart_icon: classNames(
        toolbarStyles.footerToolbar_responsiveArrowStart_icon,
        toolbarTheme && toolbarTheme.footerToolbar_responsiveArrowStart_icon
      ),
      responsiveArrowEnd_icon: classNames(
        toolbarStyles.footerToolbar_responsiveArrowEnd_icon,
        toolbarTheme && toolbarTheme.footerToolbar_responsiveArrowEnd_icon
      ),
    },
    buttonStyles: {
      buttonWrapper: buttonStyles && buttonStyles.footerToolbarButton_wrapper,
      button: buttonStyles && buttonStyles.footerToolbarButton,
      icon: buttonStyles && buttonStyles.footerToolbarButton_icon,
    },
    separatorStyles: {
      separator: separatorTheme && separatorTheme.footerToolbarSeparator,
    },
    ...rest,
  };
};

export default ({
  buttons,
  theme,
  offset,
  visibilityFn,
  displayOptions,
  toolbarDecorationFn,
  footerToolbarConfig,
  t,
}) => {
  const footerTheme = getFooterTheme(theme);
  return createStaticToolbar({
    name: 'FooterToolbar',
    theme: footerTheme,
    structure: buttons,
    offset,
    visibilityFn,
    displayOptions,
    toolbarDecorationFn,
    footerToolbarConfig,
    t,
  });
};
