import classNames from 'classnames';

import createStaticToolbar from './createStaticToolbar';
import { getTextButtonsFromList } from '../buttons/utils';
import { getStaticTextToolbarId } from '../toolbar-id';
import toolbarStyles from '../../../../statics/styles/text-static-toolbar.scss';
import separatorStyles from '../../../../statics/styles/text-static-toolbar-separator.scss';

const getStaticTextTheme = theme => {
  const {
    toolbarStyles: toolbarTheme,
    buttonStyles: buttonTheme,
    separatorStyles: separatorTheme,
    ...rest
  } = theme || {};

  return {
    toolbarStyles: {
      toolbar: classNames(toolbarStyles.textToolbar, toolbarTheme && toolbarTheme.textToolbar),
      scrollableContainer: classNames(
        toolbarStyles.textToolbar_scrollableContainer,
        toolbarTheme && toolbarTheme.textToolbar_scrollableContainer
      ),
      buttons: classNames(
        toolbarStyles.textToolbar_buttons,
        toolbarTheme && toolbarTheme.textToolbar_buttons
      ),
      extend: classNames(
        toolbarStyles.textToolbar_extend,
        toolbarTheme && toolbarTheme.textToolbar_extend
      ),
      responsiveSpacer: toolbarStyles.textToolbar_responsiveSpacer,
      responsiveArrow: classNames(
        toolbarStyles.textToolbar_responsiveArrow,
        toolbarTheme && toolbarTheme.textToolbar_responsiveArrow
      ),
      responsiveArrowLeft: classNames(
        toolbarStyles.textToolbar_responsiveArrowLeft,
        toolbarTheme && toolbarTheme.textToolbar_responsiveArrowLeft
      ),
      responsiveArrowRight: classNames(
        toolbarStyles.textToolbar_responsiveArrowRight,
        toolbarTheme && toolbarTheme.textToolbar_responsiveArrowRight
      ),
      //eslint-disable-next-line camelcase
      responsiveArrowLeft_icon: classNames(
        toolbarStyles.textToolbar_responsiveArrowLeft_icon,
        toolbarTheme && toolbarTheme.textToolbar_responsiveArrowLeft_icon
      ),
      //eslint-disable-next-line camelcase
      responsiveArrowRight_icon: classNames(
        toolbarStyles.textToolbar_responsiveArrowRight_icon,
        toolbarTheme && toolbarTheme.textToolbar_responsiveArrowRight_icon
      ),
    },
    buttonStyles: {
      inlineToolbarButton_wrapper: buttonTheme && buttonTheme.textToolbarButton_wrapper, //eslint-disable-line camelcase
      inlineToolbarButton: buttonTheme && buttonTheme.textToolbarButton, //eslint-disable-line camelcase
      inlineToolbarButton_icon: buttonTheme && buttonTheme.textToolbarButton_icon, //eslint-disable-line camelcase
    },
    separatorStyles: {
      separator: classNames(
        separatorStyles.textToolbarSeparator,
        separatorTheme && separatorTheme.textToolbarSeparator
      ),
    },
    ...rest,
  };
};

export default ({
  buttons,
  textPluginButtons,
  pubsub,
  theme,
  isMobile,
  helpers,
  anchorTarget,
  relValue,
  t,
  refId,
  offset,
  visibilityFn,
  displayOptions,
  uiSettings,
  toolbarDecorationFn,
}) => {
  const staticTextTheme = getStaticTextTheme(theme);
  const structure = getTextButtonsFromList({
    buttons,
    textPluginButtons,
    pubsub,
    theme: staticTextTheme,
    t,
    uiSettings,
  });
  const id = getStaticTextToolbarId(refId);

  return createStaticToolbar({
    name: 'StaticTextToolbar',
    structure,
    pubsub,
    theme: staticTextTheme,
    isMobile,
    helpers,
    linkModal: true,
    anchorTarget,
    relValue,
    t,
    id,
    offset,
    visibilityFn,
    displayOptions,
    uiSettings,
    toolbarDecorationFn,
  });
};
