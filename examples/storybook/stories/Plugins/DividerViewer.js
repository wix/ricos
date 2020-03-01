import React from 'react';
import { RichContentViewer } from 'wix-rich-content-viewer';
import { dividerTypeMapper } from 'wix-rich-content-plugin-divider/dist/module.viewer';
import PropTypes from 'prop-types';

export default ({ initialState }) => (
  <RichContentViewer initialState={initialState} typeMappers={[dividerTypeMapper]} />
);

RichContentViewer.propTypes = {
  initialState: PropTypes.object,
};
