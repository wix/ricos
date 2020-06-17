/* eslint-disable */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Styles from '../../../../statics/styles/static-toolbar-shortcut.scss';
import AddPluginMenu from '../SideToolbar/AddPluginMenu';
import classnames from 'classnames';
import { ShortcutIcon } from '../../Icons';

class ShortcutButton extends Component {
  constructor(props) {
    super(props);
    const {
      structure,
      addPluginMenuProps: { addPluginMenuConfig },
    } = props;
    let pluginMenuPlugins = structure.filter(
      ({ section }) => section !== 'BlockToolbar_Section_Basic'
    );
    if (!addPluginMenuConfig.splitToSections) {
      addPluginMenuConfig.splitToSections = true;
      pluginMenuPlugins = pluginMenuPlugins.map(plugin => ({ ...plugin, section: 'Add a Block' }));
    }
    this.pluginMenuPlugins = pluginMenuPlugins;
  }

  handleClick = event => {
    event.stopPropagation();
    const { isActive, togglePluginMenu } = this.props;
    togglePluginMenu(!isActive);
  };

  render() {
    const { addPluginMenuProps, isActive } = this.props;
    return [
      <div
        className={classnames(Styles.button, isActive && Styles.active, Styles.separator)}
        key={'shorcutButton'}
        onClick={event => this.handleClick(event)}
      >
        More
        <ShortcutIcon />
      </div>,
      isActive && (
        <div className={Styles.shortcutPluginMenu} onClick={event => event.stopPropagation()}>
          <AddPluginMenu
            {...addPluginMenuProps}
            structure={this.pluginMenuPlugins}
            isActive={isActive}
          />
        </div>
      ),
    ];
  }
}

ShortcutButton.propTypes = {
  addPluginMenuProps: PropTypes.object.isRequired,
};

export default ShortcutButton;
