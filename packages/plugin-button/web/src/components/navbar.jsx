import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { mergeStyles } from 'wix-rich-content-common';
import styles from '../../statics/styles/navbar.scss';

class Navbar extends PureComponent {
  constructor(props) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
  }
  render() {
    return (
      <div className={this.styles.button_navbar_container}>
        <div className={this.styles.button_navbar_settingOptions}>
          <button
            className={this.styles.button_navbar_button}
            onClick={this.props.onCancel}
            style={{ textAlign: 'left' }}
          >
            {this.props.t('ButtonPlugin_Navbar_Cancel_button')}
          </button>
          <button
            className={this.styles.button_navbar_button}
            onClick={this.props.onConfirm}
            style={{ textAlign: 'right' }}
          >
            {this.props.t('ButtonPlugin_Navbar_Update_button')}
          </button>
        </div>
      </div>
    );
  }
}

Navbar.propTypes = {
  onCancel: PropTypes.func,
  onConfirm: PropTypes.func,
  theme: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
};

export default Navbar;
