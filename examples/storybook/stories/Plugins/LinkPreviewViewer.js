import React from 'react';
import { RichContentViewer } from 'wix-rich-content-viewer';
import PropTypes from 'prop-types';
import {
  linkPreviewTypeMapper,
  LINK_PREVIEW_TYPE,
} from 'wix-rich-content-plugin-link-preview/dist/module.viewer';
import { linkTypeMapper } from 'wix-rich-content-plugin-link/dist/module.viewer';

const typeMappers = [linkPreviewTypeMapper, linkTypeMapper];
const viewerConfig = {
  [LINK_PREVIEW_TYPE]: { enableEmbed: true },
};

const DividerViewer = ({ initialState }) => (
  <RichContentViewer initialState={initialState} typeMappers={typeMappers} config={viewerConfig} />
);

DividerViewer.propTypes = {
  initialState: PropTypes.object,
};

export default DividerViewer;
