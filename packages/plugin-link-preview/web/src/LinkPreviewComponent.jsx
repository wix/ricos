import React from 'react';
import PropTypes from 'prop-types';
import LinkPreviewViewer from './LinkPreviewViewer';

const LinkPreviewComponent = props => {
  const { blockProps, settings, theme, isMobile, iframeSandboxDomain } = props;
  return (
    <LinkPreviewViewer
      componentData={blockProps.getData()}
      settings={settings}
      theme={theme}
      isMobile={isMobile}
      iframeSandboxDomain={iframeSandboxDomain}
    />
  );
};

LinkPreviewComponent.propTypes = {
  blockProps: PropTypes.object,
  settings: PropTypes.object,
  theme: PropTypes.object,
  isMobile: PropTypes.bool,
  iframeSandboxDomain: PropTypes.string,
};

export default LinkPreviewComponent;
