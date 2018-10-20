import React, { Component } from 'react';
import styles from '../../statics/styles/giphy-modal-arrow.scss';
import PropTypes from 'prop-types';

class Arrow extends Component {

  render() {
    const { buttonRef } = this.props;
    const { top } = buttonRef.getBoundingClientRect();
    return (
      <div>
        {(top > 357) ?
          <div className={styles.down_arrow} /> : <div className={styles.up_arrow} />}
      </div>
    );
  }
}

Arrow.propTypes = {
  buttonRef: PropTypes.object
};
export default Arrow;
