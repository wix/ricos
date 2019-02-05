import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps';
import ReactGoogleMapLoader from 'react-google-maps-loader';

const GoogleMapWrapper = withGoogleMap(props => (
  <GoogleMap
    defaultZoom={props.zoom}
    defaultCenter={{ lat: props.lat, lng: props.lng }}
    center={{ lat: props.lat, lng: props.lng }}
    zoom={props.zoom}
    options={{
      draggable: props.isDraggingAllowed,
      mapTypeId: props.mode,
      zoomControl: props.isZoomControlShown,
      streetViewControl: props.isStreetViewControlShown
    }}
  >
    <Marker
      options={{ visible: props.isMarkerShown }}
      title={props.markerTitle}
      position={{ lat: props.lat, lng: props.lng }}
      onClick={props.onMarkerClick}
    >
      {props.isMarkerTooltipRendered &&
      <InfoWindow onCloseClick={props.onMarkerTooltipCloseClick}>
        <div>{props.markerTooltipContent}</div>
      </InfoWindow>
      }
    </Marker>
  </GoogleMap>)
);

export class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMarkerTooltipRendered: false,
    };
  }

  render() {
    const { apiKey, componentData } = this.props;

    return (
      <ReactGoogleMapLoader
        params={{
          key: apiKey,
          libraries: 'geometry,drawing,places',
        }}
        render={googleMaps => googleMaps &&
        <GoogleMapWrapper
          isMarkerShown={componentData.map.isMarkerShown}
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: componentData.config.height || '400px' }} />}
          mapElement={<div style={{ height: `100%` }} />}
          zoom={componentData.map.zoom}
          lat={Number(componentData.map.lat)}
          lng={Number(componentData.map.lng)}
          markerTitle={componentData.map.address}
          markerTooltipContent={componentData.map.locationDisplayName}
          onMarkerTooltipCloseClick={() => this.setState({ isMarkerTooltipRendered: false })}
          onMarkerClick={() => this.setState({ isMarkerTooltipRendered: !this.state.isMarkerTooltipRendered })}
          isMarkerTooltipRendered={this.state.isMarkerTooltipRendered}
          mode={componentData.map.mode}
          isZoomControlShown={componentData.map.isZoomControlShown}
          isStreetViewControlShown={componentData.map.isStreetViewControlShown}
          isDraggingAllowed={componentData.map.isDraggingAllowed}
          {...this.props}
        />
        }
      />
    );
  }
}

Map.propTypes = {
  componentData: PropTypes.object.isRequired,
  apiKey: PropTypes.string
};

