import React from 'react';
import PropTypes from 'prop-types';
import LinkPreviewViewer from './LinkPreviewViewer';

const LinkPreviewComponent = props => {
  const { blockProps, settings, theme, isMobile, sandboxedDomain } = props;
  return (
    <LinkPreviewViewer
      componentData={blockProps.getData()}
      settings={settings}
      theme={theme}
      isMobile={isMobile}
      sandboxedDomain={sandboxedDomain}
    />
  );
};

LinkPreviewComponent.propTypes = {
  blockProps: PropTypes.object,
  settings: PropTypes.object,
  theme: PropTypes.object,
  isMobile: PropTypes.bool,
  sandboxedDomain: PropTypes.string,
};

export default LinkPreviewComponent;
