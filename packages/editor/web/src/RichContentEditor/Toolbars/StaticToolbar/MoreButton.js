/* eslint-disable */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Styles from '../../../../statics/styles/static-toolbar-more-button.scss';
import AddPluginMenu from '../SideToolbar/AddPluginMenu';
import classnames from 'classnames';
import { ShortcutIcon } from '../../Icons';
import ClickOutside from 'react-click-outside';

class MoreButton extends Component {
  constructor(props) {
    super(props);
    this.state = {};
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

  handleClick = event => {
    event.stopPropagation();
    const { isActive, togglePluginMenu } = this.props;
    togglePluginMenu(!isActive);
  };

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

  onClickOutside = () => {
    const { isActive, togglePluginMenu } = this.props;
    isActive && togglePluginMenu(false);
  };

  render() {
    const { addPluginMenuProps, isActive } = this.props;
    const { pluginMenuPosition } = this.state;
    return [
      <div
        className={classnames(Styles.moreButton, isActive && Styles.active)}
        key={'shorcutButton'}
        onClick={event => this.handleClick(event)}
        ref={ref => this.calculatePluginMenuPosition(ref)}
      >
        More
        <ShortcutIcon />
      </div>,
      isActive && (
        <ClickOutside onClickOutside={this.onClickOutside}>
          <div
            className={Styles.shortcutPluginMenu}
            style={{ ...pluginMenuPosition }}
            onClick={event => event.stopPropagation()}
          >
            <AddPluginMenu
              {...addPluginMenuProps}
              addPluginMenuConfig={this.addPluginMenuConfig}
              structure={this.structure}
              isActive={isActive}
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
