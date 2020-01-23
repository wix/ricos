import React from 'react';
import 'wix-rich-content-common/dist/styles.min.css';
import { RichContentViewer } from 'wix-rich-content-viewer';
import contentState from './contentState';
import * as PropTypes from 'prop-types';

function RichContentViewerWrapper({ pluginTypeMapper }) {
  const initialState = contentState;

  const typeMappers = Array.isArray(pluginTypeMapper) ? pluginTypeMapper : [pluginTypeMapper];
  return (
    <div>
      <h1>viewer {`playground`}</h1>
      <RichContentViewer typeMappers={typeMappers} initialState={initialState} />
    </div>
  );
}

RichContentViewerWrapper.propTypes = {
  pluginTypeMapper: PropTypes.oneOfType([PropTypes.array, PropTypes.func]),
};

export default RichContentViewerWrapper;
