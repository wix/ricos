import React from 'react';
import PropTypes from 'prop-types';
import styles from './Iframe.scss';

const Iframe = ({ iframeRef, ...otherProps }) => (
  <iframe
    ref={iframeRef}
    className={styles.iframe}
    title="remote content"
    allowTransparency
    {...otherProps}
  />
);

Iframe.propTypes = {
  iframeRef: PropTypes.func,
};

export default Iframe;
