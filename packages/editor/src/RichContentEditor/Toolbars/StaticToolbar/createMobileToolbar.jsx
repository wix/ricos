import classNames from 'classnames';
import { decorateComponentWithProps, WixUtils } from 'wix-rich-content-common';
import createStaticToolbar from './createStaticToolbar';
import { AddPluginButton } from '../buttons';
import { getTextButtonsFromList } from '../buttons/utils';
import toolbarStyles from '../../../../statics/styles/mobile-toolbar.scss';
import buttonStyles from '../../../../statics/styles/mobile-toolbar-button.scss';
import separatorStyles from '../../../../statics/styles/mobile-toolbar-separator.scss';

const createMobileToolbar = ({
  buttons,
  textPluginButtons,
  pluginButtons,
  helpers,
  pubsub,
  getEditorState,
  setEditorState,
  anchorTarget,
  relValue,
  theme,
  t,
  offset,
  visibilityFn,
  uiSettings,
  displayOptions,
  toolbarDecorationFn,
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
      pluginButtons,
      helpers,
      pubsub,
      getEditorState,
      setEditorState,
      mobileTheme,
      t,
      uiSettings,
    }),
    anchorTarget,
    relValue,
    isMobile: true,
    offset,
    visibilityFn,
    uiSettings,
    displayOptions,
    toolbarDecorationFn,
  });
};

const getMobileTheme = theme => {
  const {
    toolbarStyles: toolbarTheme,
    buttonStyles: buttonTheme,
    separatorStyles: separatorTheme,
    ...rest
  } = theme || {};

  return {
    toolbarStyles: {
      toolbar: classNames(toolbarStyles.mobileToolbar, toolbarTheme && toolbarTheme.mobileToolbar, {
        [toolbarStyles.mobileToolbar_fixed]: !WixUtils.isiOS(),
        [toolbarTheme.mobileToolbar_fixed]:
          toolbarTheme && toolbarTheme.mobileToolbar_fixed && !WixUtils.isiOS(),
      }),
      scrollableContainer: classNames(
        toolbarStyles.mobileToolbar_scrollableContainer,
        toolbarTheme && toolbarTheme.mobileToolbar_scrollableContainer
      ),
      buttons: classNames(
        toolbarStyles.mobileToolbar_buttons,
        toolbarTheme && toolbarTheme.mobileToolbar_buttons
      ),
      extend: classNames(
        toolbarStyles.mobileToolbar_extend,
        toolbarTheme && toolbarTheme.mobileToolbar_extend
      ),
      responsiveSpacer: toolbarStyles.mobileToolbar_responsiveSpacer,
      responsiveArrow: classNames(
        toolbarStyles.mobileToolbar_responsiveArrow,
        toolbarTheme && toolbarTheme.mobileToolbar_responsiveArrow
      ),
      responsiveArrowLeft: classNames(
        toolbarStyles.mobileToolbar_responsiveArrowLeft,
        toolbarTheme && toolbarTheme.mobileToolbar_responsiveArrowLeft
      ),
      responsiveArrowRight: classNames(
        toolbarStyles.mobileToolbar_responsiveArrowRight,
        toolbarTheme && toolbarTheme.mobileToolbar_responsiveArrowRight
      ),
      //eslint-disable-next-line camelcase
      responsiveArrowLeft_icon: classNames(
        toolbarStyles.mobileToolbar_responsiveArrowLeft_icon,
        toolbarTheme && toolbarTheme.mobileToolbar_responsiveArrowLeft_icon
      ),
      //eslint-disable-next-line camelcase
      responsiveArrowRight_icon: classNames(
        toolbarStyles.mobileToolbar_responsiveArrowRight_icon,
        toolbarTheme && toolbarTheme.mobileToolbar_responsiveArrowRight_icon
      ),
    },
    buttonStyles: {
      //eslint-disable-next-line camelcase
      inlineToolbarButton_wrapper: classNames(
        buttonStyles.mobileToolbarButton_wrapper,
        buttonTheme && buttonTheme.mobileToolbarButton_wrapper
      ),
      inlineToolbarButton: classNames(
        buttonStyles.mobileToolbarButton,
        buttonTheme && buttonTheme.mobileToolbarButton
      ),
      //eslint-disable-next-line camelcase
      inlineToolbarButton_icon: classNames(
        buttonStyles.mobileToolbarButton_icon,
        buttonTheme && buttonTheme.mobileToolbarButton_icon
      ),
    },
    separatorStyles: {
      separator: classNames(
        separatorStyles.mobileToolbarSeparator,
        separatorTheme && separatorTheme.mobileToolbarSeparator
      ),
    },
    ...rest,
  };
};

const getMobileButtons = ({
  buttons,
  textPluginButtons,
  pluginButtons,
  helpers,
  pubsub,
  getEditorState,
  setEditorState,
  mobileTheme,
  t,
  uiSettings,
}) => {
  const addPluginIndex = buttons.findIndex(b => b === 'AddPlugin');
  if (addPluginIndex !== -1) {
    buttons.splice(addPluginIndex, 1);
  }

  const structure = getTextButtonsFromList({
    buttons,
    textPluginButtons,
    theme: mobileTheme,
    isMobile: true,
    t,
    uiSettings,
  });

  if (addPluginIndex !== -1) {
    const addAddPluginButton = pluginButtons && pluginButtons.length;
    if (addAddPluginButton) {
      structure.splice(
        addPluginIndex,
        0,
        decorateComponentWithProps(AddPluginButton, {
          openModal: helpers.openModal,
          closeModal: helpers.closeModal,
          pluginButtons,
          getEditorState,
          setEditorState,
          pubsub,
          t,
          theme: mobileTheme,
        })
      );
    }
  }

  return structure;
};

export default createMobileToolbar;
