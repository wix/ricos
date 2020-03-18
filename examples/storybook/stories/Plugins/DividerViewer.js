import React from 'react';
import { RichContentViewer } from 'wix-rich-content-viewer';
import { dividerTypeMapper } from 'wix-rich-content-plugin-divider/dist/module.viewer';
import PropTypes from 'prop-types';

const DividerViewer = ({ initialState }) => (
  <RichContentViewer initialState={initialState} typeMappers={[dividerTypeMapper]} />
);

DividerViewer.propTypes = {
  initialState: PropTypes.object,
};

export default DividerViewer;
