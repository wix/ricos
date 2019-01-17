import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MapViewer from './map-viewer';
import { DEFAULTS } from './constants';

class MapComponent extends Component {
  render() {
    return (
      <div>
        <MapViewer {...this.props} />
      </div>
    );
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

export { MapComponent as Component, DEFAULTS };
