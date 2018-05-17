import React from 'react';
import PropTypes from 'prop-types';
import styles from './TextArea.scss';

const TextArea = props => <textarea className={styles.textArea} {...props}/>;

export default TextArea;
