/* eslint-disable react/prop-types */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

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

export const Section = ({ title, children }) => (
  <div className="section">
    <h2>{title}</h2>
    {children}
  </div>
);

Section.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
};

export const RichContentEditorBox = ({ children }) => <div className="rce-wrapper">{children}</div>;

RichContentEditorBox.propTypes = {
  children: PropTypes.node,
};

export const RichContentViewerBox = ({ children }) => <div className="rcv-wrapper">{children}</div>;

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
