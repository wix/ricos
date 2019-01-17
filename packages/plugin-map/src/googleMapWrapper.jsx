import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, MarkerWithLabel, BicyclingLayer } from 'react-google-maps';
{/* <BicyclingLayer autoUpdate /> */ }
const { InfoBox } = require("react-google-maps/lib/components/addons/InfoBox");
const Wrapper = withScriptjs(withGoogleMap(props =>
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
    <InfoBox
      defaultPosition={new google.maps.LatLng(props.lat, props.lng)}
    >
      <div style={{ backgroundColor: `yellow`, opacity: 0.75, padding: `12px` }}>
        <div style={{ fontSize: `16px`, fontColor: `#08233B` }}>
          Hi, Lior!
        </div>
      </div>
    </InfoBox>
    <Marker options={{ visible: props.isMarkerShown }} position={{ lat: props.lat, lng: props.lng }} />
  </GoogleMap>

));

class GoogleMapWrapper extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { Apikey, componentData } = this.props;
    return (
      <Wrapper
        isMarkerShown={componentData.map.isMarkerShown}
        googleMapURL={"https://maps.googleapis.com/maps/api/js?key=" + Apikey + "&v=3.exp&libraries=geometry,drawing,places"}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: componentData.config.height || '400px' }} />}
        mapElement={<div style={{ height: `100%` }} />}
        zoom={componentData.map.zoom}
        lat={Number(componentData.map.lat)}
        lng={Number(componentData.map.lng)}
        mode={componentData.map.mode}
        isZoomControlShown={componentData.map.isZoomControlShown}
        isStreetViewControlShown={componentData.map.isStreetViewControlShown}
        isDraggingAllowed={componentData.map.isDraggingAllowed}
        {...this.props}
      />
    );
  }
}

export default GoogleMapWrapper;
