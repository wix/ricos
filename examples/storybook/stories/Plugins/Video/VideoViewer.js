import React from 'react';
import { RichContentViewer } from 'wix-rich-content-viewer';
import { videoTypeMapper } from 'wix-rich-content-plugin-video/dist/module.viewer';
import PropTypes from 'prop-types';

const Viewer = ({ initialState }) => (
  <RichContentViewer initialState={initialState} typeMappers={[videoTypeMapper]} />
);

Viewer.propTypes = {
  initialState: PropTypes.object,
};

export default Viewer;
