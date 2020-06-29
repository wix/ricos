/* eslint-disable */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Styles from '../../../../statics/styles/static-toolbar-more-button.scss';
import AddPluginMenu from '../SideToolbar/AddPluginMenu';
import classnames from 'classnames';
import { ShortcutIcon } from '../../Icons';
import ClickOutside from 'react-click-outside';
import { getLangDir } from 'wix-rich-content-common';

class MoreButton extends Component {
  constructor(props) {
    super(props);
    this.state = { showPluginMenu: false };
    const { structure, footerToolbarConfig = {} } = props;
    const { showSearch, splitToSections } = footerToolbarConfig.morePluginsMenu || {};
    this.addPluginMenuConfig = {
      showSearch,
      splitToSections: true,
    };
    if (!splitToSections) {
      this.structure = structure.map(plugin => ({
        ...plugin,
        section: 'BlockToolbar_Section_NoSections',
      }));
    } else {
      this.structure = structure;
    }
  }

  calculatePluginMenuPosition = ref => {
    if (ref && !this.state.pluginMenuPosition) {
      const clientRect = ref.getBoundingClientRect();
      const pluginMenuPosition = {
        right: clientRect.right >= window.innerWidth && 0,
        left: clientRect.right < window.innerWidth && clientRect.left - 200,
      };
      this.setState({ pluginMenuPosition });
    }
  };

  togglePopup = showPluginMenu => this.setState({ showPluginMenu });

  render() {
    const { addPluginMenuProps, isActive, t } = this.props;
    const { pluginMenuPosition, showPluginMenu } = this.state;
    return [
      <div
        className={classnames(Styles.moreButton, isActive && Styles.active)}
        key="shorcutButton"
        onClick={() => this.togglePopup(!showPluginMenu)}
        ref={ref => this.calculatePluginMenuPosition(ref)}
        data-hook="moreButton"
      >
        {t('Shortcut_Toolbar_ViewAll_Blocks')}
        <ShortcutIcon />
      </div>,
      showPluginMenu && (
        <ClickOutside onClickOutside={() => this.togglePopup(false)} key="shortcutMenu">
          <div
            className={Styles.shortcutPluginMenu}
            style={{ ...pluginMenuPosition }}
            onClick={event => event.stopPropagation()}
          >
            <AddPluginMenu
              {...addPluginMenuProps}
              t={t}
              addPluginMenuConfig={this.addPluginMenuConfig}
              structure={this.structure}
              isActive={showPluginMenu}
              isMobile={false}
              hidePopup={() => this.togglePopup(false)}
            />
          </div>
        </ClickOutside>
      ),
    ];
  }
}

MoreButton.propTypes = {
  addPluginMenuProps: PropTypes.object.isRequired,
};

export default MoreButton;
