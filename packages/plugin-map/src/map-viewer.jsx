import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { mergeStyles, validate } from 'wix-rich-content-common';
import isEqual from 'lodash/isEqual';
import schema from '../statics/data-schema.json';
import styles from '../statics/styles/map-viewer.scss';
import GoogleMapWrapper from './googleMapWrapper';

class MapViewer extends Component {
  constructor(props) {
    super(props);
    validate(props.componentData, schema);
    this.styles = mergeStyles({ styles, theme: props.theme });
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(nextProps.componentData, this.props.componentData)) {
      validate(nextProps.componentData, schema);
    }
  }

  render() {
    const { componentData } = this.props; // eslint-disable-line no-unused-vars
    const { googleMapApiKey } = this.props.settings;
    return (
      <di>
        <GoogleMapWrapper Apikey={googleMapApiKey} componentData={componentData} {...this.props} />
      </di>
    );
  }
}

MapViewer.propTypes = {
  componentData: PropTypes.object.isRequired,
  theme: PropTypes.object,
  onReady: PropTypes.func,
  onStart: PropTypes.func,
  controls: PropTypes.bool,
  width: PropTypes.string,
  height: PropTypes.string,
  settings: PropTypes.object
};

MapViewer.defaultProps = {
  width: '100%',
  height: '100%',
  controls: true,
};

export default MapViewer;
