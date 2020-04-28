import React from 'react';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import PropTypes from 'prop-types';
import { Prism } from 'react-syntax-highlighter';
import styles from './SyntaxHighlighter.scss';

const SyntaxHighlighter = ({ code }) => {
  return (
    <div className={styles.prism}>
      <Prism language="javascript" style={atomDark}>
        {code}
      </Prism>
    </div>
  );
};

SyntaxHighlighter.propTypes = {
  code: PropTypes.string,
};
export default SyntaxHighlighter;
