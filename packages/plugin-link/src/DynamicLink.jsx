import React from 'react';
import PropTypes from 'prop-types';
import LinkViewer from './LinkViewer';

const DynamicLink = ({ children, href, rel, target, ...otherProps }) => (
  <LinkViewer componentData={{ url: href, rel, target }} {...otherProps}>
    {children}
  </LinkViewer>
);

DynamicLink.propTypes = {
  children: PropTypes.node,
  href: PropTypes.string.isRequired,
  rel: PropTypes.string.isRequired,
  target: PropTypes.string.isRequired,
};

export default DynamicLink;
