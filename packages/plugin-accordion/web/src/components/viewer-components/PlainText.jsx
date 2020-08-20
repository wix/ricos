import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from '../../../statics/styles/plain-text.scss';

class PlainText extends Component {
  render() {
    const { placeholder } = this.props;
    return <input className={styles.plainText} value={''} placeholder={placeholder} readOnly />;
  }
}

PlainText.propTypes = {
  placeholder: PropTypes.string,
};

export default PlainText;
