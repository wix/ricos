import decorateComponentWithProps from 'decorate-component-with-props';
import classNames from 'classnames';
import get from 'lodash/get';
import { baseUtils } from 'photography-client-lib/dist/src/utils/baseUtils';
import createStaticToolbar from './createStaticToolbar';
import { AddPluginButton, MobileTextButtonList } from '../buttons';
import { getTextButtonsFromList } from '../buttons/utils';
import toolbarStyles from '~/Styles/mobile-toolbar.scss';
import buttonStyles from '~/Styles/mobile-toolbar-button.scss';
import separatorStyles from '~/Styles/mobile-toolbar-separator.scss';

const getMobileTheme = theme => {
  const {
    toolbarStyles: toolbarTheme,
    buttonStyles: buttonTheme,
    separatorStyles: separatorTheme,
    ...rest
  } = theme || {};

  return {
    toolbarStyles: {
      toolbar: classNames(
        toolbarStyles.mobileToolbar,
        toolbarTheme && toolbarTheme.mobileToolbar,
        {
          [toolbarStyles.mobileToolbar_fixed]: !baseUtils.isiOS(),
          [toolbarTheme.mobileToolbar_fixed]: !baseUtils.isiOS(),
        }
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
      responsiveArrowLeft_icon: classNames( //eslint-disable-line camelcase
        toolbarStyles.mobileToolbar_responsiveArrowLeft_icon,
        toolbarTheme && toolbarTheme.mobileToolbar_responsiveArrowLeft_icon
      ),
      responsiveArrowRight_icon: classNames( //eslint-disable-line camelcase
        toolbarStyles.mobileToolbar_responsiveArrowRight_icon,
        toolbarTheme && toolbarTheme.mobileToolbar_responsiveArrowRight_icon
      ),
    },
    buttonStyles: {
      inlineToolbarButton_wrapper: classNames( //eslint-disable-line camelcase
        buttonStyles.mobileToolbarButton_wrapper,
        buttonTheme && buttonTheme.mobileToolbarButton_wrapper
      ),
      inlineToolbarButton: classNames(
        buttonStyles.mobileToolbarButton,
        buttonTheme && buttonTheme.mobileToolbarButton
      ),
      inlineToolbarButton_icon: classNames( //eslint-disable-line camelcase
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
    ...rest
  };
};

const getMobileButtons = ({ buttons, helpers, pubsub, getEditorState, setEditorState, mobileTheme, t }) => {
  const textButtons = get(buttons, 'textButtons.mobile', MobileTextButtonList);
  const addPluginIndex = textButtons.findIndex(b => b === 'AddPlugin');
  if (addPluginIndex !== -1) {
    textButtons.splice(addPluginIndex, 1);
  }

  const structure = getTextButtonsFromList({
    buttons: textButtons,
    theme: mobileTheme,
    isMobile: true,
    t,
  });

  if (addPluginIndex !== -1) {
    structure.splice(addPluginIndex, 0, decorateComponentWithProps(AddPluginButton, {
      openModal: helpers.openModal,
      closeModal: helpers.closeModal,
      pluginButtons: buttons.pluginButtons,
      getEditorState,
      setEditorState,
      pubsub,
      t,
      theme: mobileTheme
    }));
  }

  return structure;
};

export default ({ buttons, helpers, pubsub, getEditorState, setEditorState, anchorTarget, relValue, theme, t }) => {
  const mobileTheme = getMobileTheme(theme);
  return createStaticToolbar({
    helpers,
    t,
    name: 'MobileToolbar',
    theme: mobileTheme,
    structure: getMobileButtons({ buttons, helpers, pubsub, getEditorState, setEditorState, mobileTheme, t }),
    anchorTarget,
    relValue,
    isMobile: true
  });
};
