import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { mergeStyles, validate } from 'wix-rich-content-common';
import isEqual from 'lodash/isEqual';
import MapViewer from './map-viewer';
import schema from '../statics/data-schema.json';
import styles from '../statics/styles/map-viewer.scss';
import { DEFAULTS } from './constants';

class MapComponent extends Component {
  constructor(props) {
    super(props);
  }

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

export { MapComponent as Component, DEFAULTS as DEFAULTS };