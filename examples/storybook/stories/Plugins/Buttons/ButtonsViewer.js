import React from 'react';
import { RichContentViewer } from 'wix-rich-content-viewer';
import {
  buttonTypeMapper,
  ACTION_BUTTON_TYPE,
} from 'wix-rich-content-plugin-button/dist/module.viewer';
import PropTypes from 'prop-types';

const typeMappers = [buttonTypeMapper];
const viewerConfig = {
  [ACTION_BUTTON_TYPE]: {
    onClick: () => {
      window.alert('pass `onClick` prop callback to customize action');
    },
  },
};

const ButtonsViewer = ({ initialState }) => (
  <RichContentViewer initialState={initialState} typeMappers={typeMappers} config={viewerConfig} />
);

ButtonsViewer.propTypes = {
  initialState: PropTypes.object,
};

export default ButtonsViewer;
