import classNames from 'classnames';
import { mergeStyles } from 'wix-rich-content-common';
import createStaticToolbar from './createStaticToolbar';
import { getTextButtonsFromList } from '../buttons/utils';
import toolbarStyles from '../../../../statics/styles/mobile-toolbar.scss';
import buttonStyles from '../../../../statics/styles/mobile-toolbar-button.scss';
import separatorStyles from '../../../../statics/styles/mobile-toolbar-separator.scss';

const createMobileToolbar = ({
  buttons,
  textPluginButtons,
  helpers,
  anchorTarget,
  relValue,
  theme,
  t,
  offset,
  visibilityFn,
  uiSettings,
  displayOptions,
  toolbarDecorationFn,
  config,
  locale,
}) => {
  const mobileTheme = getMobileTheme(theme);
  return createStaticToolbar({
    helpers,
    t,
    name: 'MobileToolbar',
    theme: mobileTheme,
    structure: getMobileButtons({
      buttons,
      textPluginButtons,
      helpers,
      mobileTheme,
      t,
      uiSettings,
      config,
    }),
    anchorTarget,
    relValue,
    isMobile: true,
    offset,
    visibilityFn,
    uiSettings,
    displayOptions,
    toolbarDecorationFn,
    locale,
  });
};

const getMobileTheme = theme => {
  const {
    toolbarStyles: toolbarTheme,
    buttonStyles: buttonTheme,
    separatorStyles: separatorTheme,
    ...rest
  } = theme || {};

  const toolbarMergeStyles = mergeStyles({ styles: toolbarStyles, theme: toolbarTheme });
  const buttonMergeStyles = mergeStyles({ styles: buttonStyles, theme: buttonTheme });
  const separatorMergeStyles = mergeStyles({ styles: separatorStyles, theme: separatorTheme });

  return {
    toolbarStyles: {
      toolbar: classNames(toolbarMergeStyles.mobileToolbar, toolbarMergeStyles.mobileToolbar_fixed),
      scrollableContainer: toolbarMergeStyles.mobileToolbar_scrollableContainer,
      buttons: toolbarMergeStyles.mobileToolbar_buttons,
      extend: toolbarMergeStyles.mobileToolbar_extend,
      responsiveSpacer: toolbarMergeStyles.mobileToolbar_responsiveSpacer,
      responsiveArrow: toolbarMergeStyles.mobileToolbar_responsiveArrow,
      responsiveArrowStart: toolbarMergeStyles.mobileToolbar_responsiveArrowStart,
      responsiveArrowEnd: toolbarMergeStyles.mobileToolbar_responsiveArrowEnd,
      //eslint-disable-next-line camelcase
      responsiveArrowStart_icon: toolbarMergeStyles.mobileToolbar_responsiveArrowStart_icon,
      //eslint-disable-next-line camelcase
      responsiveArrowEnd_icon: toolbarMergeStyles.mobileToolbar_responsiveArrowEnd_icon,
    },
    buttonStyles: {
      //eslint-disable-next-line camelcase
      inlineToolbarButton_wrapper: buttonMergeStyles.mobileToolbarButton_wrapper,
      inlineToolbarButton: buttonMergeStyles.mobileToolbarButton,
      //eslint-disable-next-line camelcase
      inlineToolbarButton_icon: buttonMergeStyles.mobileToolbarButton_icon,
    },
    separatorStyles: {
      separator: separatorMergeStyles.mobileToolbarSeparator,
    },
    ...rest,
  };
};

const getMobileButtons = ({ buttons, textPluginButtons, mobileTheme, t, uiSettings, config }) => {
  const structure = getTextButtonsFromList({
    buttons,
    textPluginButtons,
    theme: mobileTheme,
    isMobile: true,
    t,
    uiSettings,
    config,
  });

  return structure;
};

export default createMobileToolbar;
