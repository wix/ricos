import classNames from 'classnames';
import { mergeStyles } from 'wix-rich-content-common';
import { decorateComponentWithProps, TOOLBARS } from 'wix-rich-content-editor-common';
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
  config,
  locale,
  addPluginMenuConfig,
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
      config,
      addPluginMenuConfig,
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

  /* eslint-disable camelcase*/
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
      responsiveArrowStart_icon: toolbarMergeStyles.mobileToolbar_responsiveArrowStart_icon,
      responsiveArrowEnd_icon: toolbarMergeStyles.mobileToolbar_responsiveArrowEnd_icon,
    },
    buttonStyles: {
      inlineToolbarButton_wrapper: buttonMergeStyles.mobileToolbarButton_wrapper,
      inlineToolbarButton: buttonMergeStyles.mobileToolbarButton,
      inlineToolbarButton_icon: buttonMergeStyles.mobileToolbarButton_icon,
      inlineToolbarButton_menuButton: buttonMergeStyles.mobileToolbarButton_menuButton,
    },
    separatorStyles: {
      separator: separatorMergeStyles.mobileToolbarSeparator,
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
  config,
  addPluginMenuConfig,
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
    config,
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
          structure: pluginButtons.filter(({ buttonSettings }) =>
            buttonSettings.toolbars.includes(TOOLBARS.MOBILE)
          ),
          getEditorState,
          setEditorState,
          pubsub,
          t,
          theme: mobileTheme,
          addPluginMenuConfig,
        })
      );
    }
  }

  return structure;
};

export default createMobileToolbar;
