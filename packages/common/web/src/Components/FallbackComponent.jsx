import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from '../statics/fallback.scss';

class FallbackComponent extends Component {
  static propTypes = {
    error: PropTypes.object.isRequired,
  };

  render() {
    const { error } = this.props;
    const { message, stack } = error;
    return (
      <div className={styles.errorMessage}>
        <p>{'An error occurred while rendering the RichContentViewer'}</p>
        {message && <p>{message}</p>}
        {stack && <p>{stack}</p>}
      </div>
    );
  }
}

export default FallbackComponent;
