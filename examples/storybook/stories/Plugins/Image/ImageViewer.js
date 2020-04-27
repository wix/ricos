import React from 'react';
import { RichContentViewer } from 'wix-rich-content-viewer';
import { imageTypeMapper } from 'wix-rich-content-plugin-image/dist/module.viewer';
import PropTypes from 'prop-types';

const DividerViewer = ({ initialState }) => (
  <RichContentViewer initialState={initialState} typeMappers={[imageTypeMapper]} />
);

DividerViewer.propTypes = {
  initialState: PropTypes.object,
};

export default DividerViewer;
