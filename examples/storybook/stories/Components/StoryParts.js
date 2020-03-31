/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import ReactJson from 'react-json-view';

import SourceCode from './SourceCode';
import styles from './styles.scss';

export const Page = ({ title, children }) => (
  <div className={styles.page}>
    <h1>{title}</h1>
    {children}
  </div>
);

Page.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
};

export const Section = ({ type, title, children }) => {
  let _children = children;
  if (type === Section.Types.COMPARISON) {
    _children = React.Children.map(children, child => React.cloneElement(child, { title: true }));
  }
  return (
    <div className={styles.section}>
      <h2>{title}</h2>
      <div className={styles[type]}>{_children}</div>
    </div>
  );
};

Section.Types = {
  COMPARISON: 'Comparison',
};

Section.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
};

export const RichContentEditorBox = ({ children, preset = '', sourcecode, contentState }) => {
  return (
    <div className={styles[preset]}>
      <div className={styles.rceWrapper}>{children}</div>
      {sourcecode && <SourceCode code={sourcecode} />}
      {contentState && (
        <div>
          <p>Content State:</p>
          <ContentState json={contentState} />
        </div>
      )}
    </div>
  );
};

RichContentEditorBox.propTypes = {
  children: PropTypes.node,
};

export const RichContentViewerBox = ({ children, preset, sourcecode }) => (
  <div className={`${styles[preset || '']}`}>
    <div className={styles.rcvWrapper}>{children}</div>
    {sourcecode && <SourceCode code={sourcecode} />}
  </div>
);

RichContentViewerBox.propTypes = {
  children: PropTypes.node,
};

export const ContentState = ({ json }) => <ReactJson src={json} collapsed={1} />;
