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
    const { structure, footerToolbarConfig } = props;
    const addPluginMenuConfig = { showSearch: footerToolbarConfig.showSearch };
    if (!footerToolbarConfig.splitToSections) {
      addPluginMenuConfig.splitToSections = true;
      this.structure = structure.map(plugin => ({ ...plugin, section: 'Add a Block' }));
    } else {
      this.structure = structure;
    }
    this.addPluginMenuConfig = addPluginMenuConfig;
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
            addPluginMenuConfig={this.addPluginMenuConfig}
            structure={this.structure}
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
