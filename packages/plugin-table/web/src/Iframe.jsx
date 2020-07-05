import React from 'react';
import PropTypes from 'prop-types';
import styles from '../statics/styles/Iframe.scss';

const Iframe = ({ iframeRef, ...otherProps }) => (
  <iframe
    ref={iframeRef}
    className={styles.iframe}
    title="remote content"
    style={{ backgroundColor: 'transparent' }}
    {...otherProps}
  />
);

Iframe.propTypes = {
  iframeRef: PropTypes.func,
};

export default Iframe;
