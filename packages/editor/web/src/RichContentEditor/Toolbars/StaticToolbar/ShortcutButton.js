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
    this.state = {};
    const { structure, footerToolbarConfig = {} } = props;
    this.addPluginMenuConfig = {
      showSearch: footerToolbarConfig.showSearch,
      splitToSections: true,
    };
    if (!footerToolbarConfig.splitToSections) {
      this.structure = structure.map(plugin => ({ ...plugin, section: 'Add a Block' }));
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
    if (ref && !this.state.left) {
      const left = ref.getBoundingClientRect().left - 50;
      this.setState({ left });
    }
  };

  render() {
    const { addPluginMenuProps, isActive } = this.props;
    const { left } = this.state;
    return [
      <div
        className={classnames(Styles.button, isActive && Styles.active, Styles.separator)}
        key={'shorcutButton'}
        onClick={event => this.handleClick(event)}
        ref={ref => this.calculatePluginMenuPosition(ref)}
      >
        More
        <ShortcutIcon />
      </div>,
      isActive && (
        <div
          className={Styles.shortcutPluginMenu}
          style={{ left }}
          onClick={event => event.stopPropagation()}
        >
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
