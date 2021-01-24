import React, { FunctionComponent } from 'react';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Prism } from 'react-syntax-highlighter';
import styles from './SyntaxHighlighter.scss';

const SyntaxHighlighter: FunctionComponent<{ code: string }> = ({ code }) => {
  return (
    <div className={styles.prism}>
      <Prism language="javascript" style={atomDark}>
        {code}
      </Prism>
    </div>
  );
};

export default SyntaxHighlighter;
