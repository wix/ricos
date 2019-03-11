import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { MapViewer } from './MapViewer';

export class MapComponent extends Component {
  render() {
    return <MapViewer {...this.props} />;
  }
}

MapComponent.propTypes = {
  componentData: PropTypes.object.isRequired,
  componentState: PropTypes.object,
  store: PropTypes.object,
  blockProps: PropTypes.object,
  className: PropTypes.string,
  theme: PropTypes.object,
  isMobile: PropTypes.bool,
  editorBounds: PropTypes.object,
};
