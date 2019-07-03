import React, { Suspense } from 'react';
import PropTypes from 'prop-types';

const SectionContent = React.memo(({ children, isLoadedLazily, fallback }) => (
  <div className="content">
    {isLoadedLazily ? <Suspense fallback={fallback}>{children}</Suspense> : children}
  </div>
));

SectionContent.propTypes = {
  isLoadedLazily: PropTypes.bool,
  fallback: PropTypes.element,
  children: PropTypes.node.isRequired,
};

SectionContent.defaultProps = {
  isLoadedLazily: true,
  fallback: <div className="placeholder">Loading...</div>,
};

export default SectionContent;
