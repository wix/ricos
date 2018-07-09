import classNames from 'classnames';
import get from 'lodash/get';
import createStaticToolbar from './createStaticToolbar';
import { DesktopTextButtonList } from '../buttons/';
import { getTextButtonsFromList } from '../buttons/utils';
import { getStaticTextToolbarId } from '../toolbar-id';
import toolbarStyles from '~/Styles/text-static-toolbar.scss';
import buttonStyles from '~/Styles/text-static-toolbar-button.scss';
import separatorStyles from '~/Styles/text-static-toolbar-separator.scss';
import tooltipStyles from '~/Styles/tooltip.scss';

const getStaticTextTheme = theme => {
  const {
    toolbarStyles: toolbarTheme,
    buttonStyles: buttonTheme,
    separatorStyles: separatorTheme,
    ...rest
  } = theme || {};

  return {
    toolbarStyles: {
      toolbar: classNames(
        toolbarStyles.textToolbar,
        toolbarTheme && toolbarTheme.textToolbar,
      ),
      scrollableContainer: classNames(
        toolbarStyles.textToolbar_scrollableContainer,
        toolbarTheme && toolbarTheme.textToolbar_scrollableContainer,
        tooltipStyles.fixedTooltip
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
      responsiveArrowLeft_icon: classNames( //eslint-disable-line camelcase
        toolbarStyles.textToolbar_responsiveArrowLeft_icon,
        toolbarTheme && toolbarTheme.textToolbar_responsiveArrowLeft_icon
      ),
      responsiveArrowRight_icon: classNames( //eslint-disable-line camelcase
        toolbarStyles.textToolbar_responsiveArrowRight_icon,
        toolbarTheme && toolbarTheme.textToolbar_responsiveArrowRight_icon
      ),
    },
    buttonStyles: {
      inlineToolbarButton_wrapper: classNames( //eslint-disable-line camelcase
        buttonStyles.textToolbarButton_wrapper,
        buttonTheme && buttonTheme.textToolbarButton_wrapper
      ),
      inlineToolbarButton: classNames(
        buttonStyles.textToolbarButton,
        buttonTheme && buttonTheme.textToolbarButton
      ),
      inlineToolbarButton_icon: classNames( //eslint-disable-line camelcase
        buttonStyles.textToolbarButton_icon,
        buttonTheme && buttonTheme.textToolbarButton_icon
      ),
    },
    separatorStyles: {
      separator: classNames(
        separatorStyles.textToolbarSeparator,
        separatorTheme && separatorTheme.textToolbarSeparator
      ),
    },
    ...rest
  };
};

export default ({ buttons, pubsub, theme, isMobile, helpers, anchorTarget, relValue, t, refId }) => {
  const textButtons = get(buttons, 'desktop', DesktopTextButtonList);
  const staticTextTheme = getStaticTextTheme(theme);
  const structure = getTextButtonsFromList({ buttons: textButtons, pubsub, theme: staticTextTheme, t });
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
    id
  });
};
