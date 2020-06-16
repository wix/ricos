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
    this.state = { showPluginMenu: false };
  }

  togglePopup = showPluginMenu => this.setState({ showPluginMenu });

  render() {
    const { addPluginMenuProps } = this.props;
    const { showPluginMenu } = this.state;
    return [
      <div
        className={classnames(Styles.button, showPluginMenu && Styles.active, Styles.separator)}
        key={'shorcutButton'}
        onClick={() => this.togglePopup(!showPluginMenu)}
      >
        More
        <ShortcutIcon />
      </div>,
      showPluginMenu && (
        <div className={Styles.shortcutPluginMenu}>
          <AddPluginMenu
            {...addPluginMenuProps}
            isActive={showPluginMenu}
            hidePopup={() => this.togglePopup(false)}
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
