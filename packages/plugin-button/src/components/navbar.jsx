import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styles from '../../statics/styles/navbar.scss';

class Navbar extends PureComponent {

  render() {
    return (
      <div className={styles.navbar}>
        <div className={styles.header} />
        <div className={styles.settingOptions}>
          <button className={styles.button} onClick={this.props.onCancel} style={{ textAlign: 'left' }}>Cancel</button>
          <div className={styles.button} style={{ textAlign: 'center' }}>**</div>
          <button className={styles.button} onClick={this.props.onConfirm} style={{ textAlign: 'right' }}>Update</button>
        </div>
      </div>
    );
  }
}

Navbar.propTypes = {
  onCancel: PropTypes.func,
  onConfirm: PropTypes.func
};

export default Navbar;
