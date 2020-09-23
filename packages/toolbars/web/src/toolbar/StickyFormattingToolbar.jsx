import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { TOOLBARS } from 'wix-rich-content-editor-common';
import { getLangDir } from 'wix-rich-content-common';
import Toolbar from './Toolbar';
import Styles from '../../statics/styles/static-toolbar.scss';
import toolbarStyles from '../../statics/styles/text-static-toolbar.scss';
import separatorStyles from '../../statics/styles/text-static-toolbar-separator.scss';

const getToolbarTheme = theme => {
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

class StickyFormattingToolbar extends React.PureComponent {
  static propTypes = {
    theme: PropTypes.object.isRequired,
    buttons: PropTypes.object.isRequired,
    isMobile: PropTypes.bool.isRequired,
    locale: PropTypes.string.isRequired,
  };
  render() {
    const { theme, buttons, isMobile, locale } = this.props;
    const staticToolbarClassName = classNames({
      [Styles.staticToolbarWrapper]: isMobile,
    });
    return (
      <div className={staticToolbarClassName} dir={getLangDir(locale)}>
        <Toolbar
          theme={getToolbarTheme(theme)}
          buttons={buttons}
          toolbarName={TOOLBARS.STATIC}
          showLabel={false}
        />
      </div>
    );
  }
}

export default StickyFormattingToolbar;
