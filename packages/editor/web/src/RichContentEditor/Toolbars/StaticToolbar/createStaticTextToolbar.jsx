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

  /* eslint-disable camelcase*/
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
      responsiveArrowStart: classNames(
        toolbarStyles.textToolbar_responsiveArrowStart,
        toolbarTheme && toolbarTheme.textToolbar_responsiveArrowStart
      ),
      responsiveArrowEnd: classNames(
        toolbarStyles.textToolbar_responsiveArrowEnd,
        toolbarTheme && toolbarTheme.textToolbar_responsiveArrowEnd
      ),
      responsiveArrowStart_icon: classNames(
        toolbarStyles.textToolbar_responsiveArrowStart_icon,
        toolbarTheme && toolbarTheme.textToolbar_responsiveArrowStart_icon
      ),
      responsiveArrowEnd_icon: classNames(
        toolbarStyles.textToolbar_responsiveArrowEnd_icon,
        toolbarTheme && toolbarTheme.textToolbar_responsiveArrowEnd_icon
      ),
    },
    buttonStyles: {
      inlineToolbarButton_wrapper: buttonTheme && buttonTheme.textToolbarButton_wrapper,
      inlineToolbarButton: buttonTheme && buttonTheme.textToolbarButton,
      inlineToolbarButton_icon: buttonTheme && buttonTheme.textToolbarButton_icon,
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
  config,
  locale,
  setEditorState,
}) => {
  const staticTextTheme = getStaticTextTheme(theme);
  const structure = getTextButtonsFromList({
    buttons,
    textPluginButtons,
    pubsub,
    theme: staticTextTheme,
    t,
    uiSettings,
    config,
    isMobile,
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
    renderTooltips: true,
    locale,
    setEditorState,
    config,
  });
};
