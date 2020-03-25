import React from 'react';
import PropTypes from 'prop-types';
import LinkPreviewViewer from './LinkPreviewViewer';

const LinkPreviewComponent = props => {
  const { blockProps, settings, theme, isMobile } = props;
  return (
    <LinkPreviewViewer
      componentData={blockProps.getData()}
      settings={settings}
      theme={theme}
      isMobile={isMobile}
    />
  );
};

LinkPreviewComponent.propTypes = {
  blockProps: PropTypes.object,
  settings: PropTypes.object,
  theme: PropTypes.object,
  isMobile: PropTypes.bool,
};

export default LinkPreviewComponent;
