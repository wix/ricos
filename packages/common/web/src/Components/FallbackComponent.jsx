import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import styles from '../../statics/styles/fallback.scss';

class FallbackComponent extends Component {
  static propTypes = {
    error: PropTypes.object.isRequired,
    t: PropTypes.func,
  };

  render() {
    // const { error } = this.props;
    // const { message, stack } = error;
    const { t } = this.props;
    return (
      // <div className={styles.errorMessage}>
      //   {typeof error === 'string' && <p>{error}</p>}
      //   {message && <p>{message}</p>}
      //   {stack && <p>{stack}</p>}
      // </div>
      <span>{t('FallbackComponent_Error_Message')}</span>
    );
  }
}

export default FallbackComponent;
