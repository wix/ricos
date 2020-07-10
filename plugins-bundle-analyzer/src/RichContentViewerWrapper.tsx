import React from 'react';
import 'wix-rich-content-common/dist/styles.min.css';
import { RichContentViewer } from 'wix-rich-content-viewer';
import contentState from './contentState';
import * as PropTypes from 'prop-types';
import { RicosContent } from 'ricos-common';
import { PluginTypeMapper } from 'wix-rich-content-common';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function RichContentViewerWrapper(pluginTypeMapper?: any) {
  const initialState: RicosContent = contentState;

  const typeMappers: PluginTypeMapper[] = Array.isArray(pluginTypeMapper)
    ? pluginTypeMapper
    : [pluginTypeMapper];
  return <RichContentViewer typeMappers={typeMappers} initialState={initialState} />;
}

RichContentViewerWrapper.propTypes = {
  pluginTypeMapper: PropTypes.oneOfType([PropTypes.array, PropTypes.func]),
};

export default RichContentViewerWrapper;
