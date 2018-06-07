import React from 'react';
import PropTypes from 'prop-types';
import Iframe from './Iframe';

const getIframeContent = html => `
  <html>
    <head></head>
    <body>${html}</body>
  </html>
`;

const IframeHtml = ({ html, ...otherProps }) => (
  <Iframe
    {...otherProps}
    srcDoc={getIframeContent(html)}
    sandbox="allow-presentation allow-forms allow-scripts"
  />
);

IframeHtml.propTypes = {
  html: PropTypes.string.isRequired,
};

export default IframeHtml;
