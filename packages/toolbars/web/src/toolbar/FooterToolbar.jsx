import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { TOOLBARS } from 'wix-rich-content-editor-common';
import { getLangDir } from 'wix-rich-content-common';
import Toolbar from './Toolbar';
import toolbarStyles from '../../statics/styles/footer-toolbar.scss';
import Styles from '../../statics/styles/static-toolbar.scss';

const getToolbarTheme = theme => {
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

// TODO: footerToolbarConfig support
class FooterToolbar extends React.PureComponent {
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
          toolbarName={TOOLBARS.FOOTER}
          showLabel={false}
        />
      </div>
    );
  }
}

export default FooterToolbar;
