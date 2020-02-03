/* eslint-disable react/prop-types */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import ReactJson from 'react-json-view';
import styles from './styles.scss';

export const Page = ({ title, children }) => (
  <div className="page">
    <h1>{title}</h1>
    {children}
  </div>
);

Page.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
};

export const Section = ({ type, title, children }) => {
  return (
    <div className={styles.section}>
      <h2>{title || type}</h2>
      <div className={styles[type]}>{children}</div>
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

export const RichContentEditorBox = ({ children, preset }) => (
  <div className={`${styles.rceWrapper} ${styles[preset || '']}`}>{children}</div>
);

RichContentEditorBox.propTypes = {
  children: PropTypes.node,
};

export const RichContentViewerBox = ({ children, preset }) => (
  <div className={`${styles.rcvWrapper} ${styles[preset || '']}`}>{children}</div>
);

RichContentViewerBox.propTypes = {
  children: PropTypes.node,
};

export const RichContentExamples = ({ examples, comp: RichContentComp }) => {
  return (
    <Fragment>
      {examples.map(({ title, props }, i) => (
        <Section key={`exmaple${i}`} title={title}>
          <RichContentEditorBox>
            <RichContentComp {...props} />
          </RichContentEditorBox>
        </Section>
      ))}
    </Fragment>
  );
};

export const ContentState = ({ json }) => <ReactJson src={json} collapsed={1} />;
