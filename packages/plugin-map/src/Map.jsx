import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps';
import ReactGoogleMapLoader from 'react-google-maps-loader';

const GoogleMapWrapper = withGoogleMap(props => (
  <GoogleMap
    center={{ lat: props.lat, lng: props.lng }}
    zoom={props.zoom}
    options={{
      draggable: props.isDraggingAllowed,
      zoomControl: props.isZoomControlShown,
      streetViewControl: props.isStreetViewControlShown,
      mapTypeControl: props.isViewControlShown,
    }}
  >
    <Marker
      options={{ visible: props.isMarkerShown }}
      title={props.markerTitle}
      position={{ lat: props.lat, lng: props.lng }}
      onClick={props.onMarkerClick}
    >
      { props.isMarkerTooltipRendered &&
        props.markerTooltipContent.trim() !== '' && (
          <InfoWindow onCloseClick={props.onMarkerTooltipCloseClick}>
            <div>{props.markerTooltipContent}</div>
          </InfoWindow>
        )}
    </Marker>
  </GoogleMap>
));

export class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMarkerTooltipRendered: true,
    };
  }

  render() {
    const { componentData } = this.props;

    return (
      <ReactGoogleMapLoader
        params={{
          key: componentData.googleMapApiKey,
          libraries: 'geometry,drawing,places',
        }}
        render={googleMaps =>
          googleMaps && (
            <GoogleMapWrapper
              isMarkerShown={componentData.mapSettings.isMarkerShown}
              loadingElement={<div style={{ height: `100%` }} />}
              containerElement={
                <div
                  style={{
                    height: componentData.config.height + 'px',
                    whiteSpace: 'initial',
                    width: componentData.config.width + 'px',
                  }}
                />
              }
              mapElement={<div style={{ height: `100%` }} />}
              lat={Number(componentData.mapSettings.lat)}
              lng={Number(componentData.mapSettings.lng)}
              markerTitle={componentData.mapSettings.address}
              markerTooltipContent={componentData.mapSettings.locationDisplayName}
              zoom={componentData.mapSettings.zoom}
              onMarkerTooltipCloseClick={() => this.setState({ isMarkerTooltipRendered: false })}
              onMarkerClick={() =>
                this.setState({ isMarkerTooltipRendered: !this.state.isMarkerTooltipRendered })
              }
              isMarkerTooltipRendered={this.state.isMarkerTooltipRendered}
              isZoomControlShown={componentData.mapSettings.isZoomControlShown}
              isStreetViewControlShown={componentData.mapSettings.isStreetViewControlShown}
              isViewControlShown={componentData.mapSettings.isViewControlShown}
              isDraggingAllowed={componentData.mapSettings.isDraggingAllowed}
            />
          )
        }
      />
    );
  }
}

Map.propTypes = {
  componentData: PropTypes.object.isRequired,
};
