import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { MapViewer } from './MapViewer';

export class MapComponent extends Component {
  componentDidMount() {
    const { width } = this.rootElement.getBoundingClientRect();

    this.props.componentData.config.width = width;

    const MAP_INITIAL_HEIGHT = 400;
    this.props.componentData.config.height = this.props.settings.height || MAP_INITIAL_HEIGHT;
  }

  setRootElementRef = elm => (this.rootElement = elm);

  render() {
    const desktopWidth = this.props.settings.width ? `${this.props.settings.width}px` : 'auto';
    const width = this.props.isMobile ? 'auto' : desktopWidth;
    const height = `${this.props.settings.height}px` || 'auto';

    return (
      <div ref={this.setRootElementRef} style={{ width, height }}>
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
  settings: PropTypes.object.isRequired,
};
