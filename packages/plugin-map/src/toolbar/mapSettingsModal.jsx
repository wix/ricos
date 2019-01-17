import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  mergeStyles,
  WixUtils,
  SettingsSection,
  InputWithLabel,
  TextInput,
  SliderWithInput,
  Checkbox,
  Button,
  Dropdown
} from 'wix-rich-content-common';
import { options } from '../constants';
import ReactGoogleMapLoader from "react-google-maps-loader";
import ReactGooglePlacesSuggest from "react-google-places-suggest";
import styles from '../../statics/styles/map-settings-modal.scss';

export default class MapSettingsModal extends Component {
  constructor(props) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
    const { componentData } = this.props;
    this.state = {
      search: '',
      address: componentData.map.address,
      zoom: componentData.map.zoom,
      lat: componentData.map.lat,
      lng: componentData.map.lng,
      mode: componentData.map.mode,
      isMarkerShown: componentData.map.isMarkerShown,
      isZoomControlShown: componentData.map.isZoomControlShown,
      isStreetViewControlShown: componentData.map.isStreetViewControlShown,
      isDraggingAllowed: componentData.map.isDraggingAllowed,
      enableSave: false
    };
  }

  handleInputChange = e => {
    this.setState({ search: e.target.value, address: e.target.value })
  }

  handleSelectSuggest = (geocodedPrediction, originalPrediction) => {
    this.setState({
      search: "",
      address: originalPrediction.description,
      enableSave: true,
      lat: geocodedPrediction.geometry.location.lat(),
      lng: geocodedPrediction.geometry.location.lng()
    })
  }

  onClick = () => {
    const { componentData, onConfirm, pubsub, helpers } = this.props;
    const map = {
      map: {
        address: this.state.address,
        zoom: this.state.zoom,
        lat: this.state.lat,
        lng: this.state.lng,
        mode: this.state.mode,
        isMarkerShown: this.state.isMarkerShown,
        isZoomControlShown: this.state.isZoomControlShown,
        isStreetViewControlShown: this.state.isStreetViewControlShown,
        isDraggingAllowed: this.state.isDraggingAllowed
      }
    }
    
    if (onConfirm) {   
      onConfirm({ ...componentData, ...map });
    } else {
      pubsub.update('componentData', { ...map });
    }

    if (helpers) {
      helpers.openModal(data => pubsub.update('componentData', { metadata: { ...data } }));
    }

    this.onCloseRequested();
  };

  onCloseRequested = () => {
    this.setState({ isOpen: false });
    this.props.helpers.closeModal();
  };

  handleKeyPress = e => {
    if (e.charCode === 27) {
      this.onCloseRequested();
    }
  };

  handleClearText = () => {
    this.setState({ searchTag: '' });
  };

  render() {
    const { theme, t, minZoom, maxZoom } = this.props;
    const { googleMapApiKey } = this.props;
    const { search, address } = this.state
    const backButton =
      (<div
        className={styles.map_settings_modal_mobile_backButton}
        onClick={this.onCloseRequested}
        role="button"
        tabIndex="0"
        onKeyPress={null}
      />);
    const saveButton = (<Button
      className={styles.map_settings_modal_save_button}
      onClick={() => this.onClick()}
      ariaProps={!this.state.enableSave && { disabled: 'disabled' }}
    >
      Save
      </Button>);

    const mobileNavbar =
      (
        <div>
          <div className={styles.map_settings_modal_mobile_header} />
          <div className={styles.map_settings_modal_mobile_navbar}>
            {saveButton}
          </div>
        </div>
      );

    return (
      <div className={styles.map_settings_modal}>
        {(WixUtils.isMobile()) && <div>{mobileNavbar}{backButton}</div>}
        <div className={styles.map_settings_modal_container}>
          <div className={styles.map_settings_modal_title_header}>{t('MapSettings_Title')}</div>
          <SettingsSection theme={theme} className={styles.map_settings_modal_section} ariaProps={{ 'aria-label': 'location', role: 'region' }}>
            <div className={styles.map_settings_modal_location_label}>{t('MapSettings_Location_Input_Label')}</div>
            <ReactGoogleMapLoader
              params={{
                key: googleMapApiKey,
                libraries: "places,geocode",
              }}
              render={googleMaps =>
                googleMaps && (
                  <div>
                    <ReactGooglePlacesSuggest
                      autocompletionRequest={{ input: search }}
                      googleMaps={googleMaps}
                      onSelectSuggest={this.handleSelectSuggest}
                    >
                      <TextInput
                        autoFocus
                        tabIndex="0"
                        theme={styles}
                        type="option"
                        placeholder={t('MapSettings_Location_Input_Placeholder')}
                        value={address}
                        onChange={this.handleInputChange}
                      />

                    </ReactGooglePlacesSuggest>
                  </div>
                )
              }
            />
          </SettingsSection>

          <SettingsSection theme={theme} className={styles.map_settings_modal_section} ariaProps={{ 'aria-label': 'advanced location', role: 'region' }}>
            <div className={styles.map_settings_modal_advanced_location_label}>{t('MapSettings_Advanced_Location_Input_Label')}</div>
            <div className={styles.map_settings_modal_advanced_location_input_container}>
              <InputWithLabel
                theme={theme}
                type="number"
                min="-85"
                max="85"
                label="Latitude"
                placeholder={t('MapSettings_Latitude_Input_Placeholder')}
                value={this.state.lat}
                onChange={event => event.target.value > -86 && event.target.value < 86 &&
                  this.setState({ lat: event.target.value, enableSave: true })}
              />
              <InputWithLabel
                theme={theme}
                type="number"
                min="-175"
                max="175"
                label="Longitude"
                placeholder={t('MapSettings_Longitude_Input_Placeholder')}
                value={this.state.lng}
                onChange={event =>  event.target.value > -176 && event.target.value < 176     &&
                this.setState({ lng: event.target.value, enableSave: true })}
              />
            </div>
          </SettingsSection>

          <SettingsSection theme={theme} className={styles.map_settings_modal_zoom_section} ariaProps={{ 'aria-label': 'zoom', role: 'region' }}>
            <div className={styles.map_settings_modal_zoom_slider_label}>{t('MapSettings_Zoom_Slider_Label')}</div>
            <SliderWithInput theme={theme} value={this.state.zoom}  min={minZoom} max={maxZoom} onChange={value => this.setState({ zoom: value, enableSave: true })} />
          </SettingsSection>

          <SettingsSection theme={theme} className={styles.map_settings_modal_dropdown_section} ariaProps={{ 'aria-label': 'ckeckboxes', role: 'region' }}>
            <Dropdown placeholder="Mode .." theme={styles} value={this.state.mode.toUpperCase()} options={options} onChange={value => this.setState({ mode: value.value, enableSave: true })} />
          </SettingsSection>

          <SettingsSection theme={theme} className={styles.map_settings_modal_checkbox_section} ariaProps={{ 'aria-label': 'ckeckboxes', role: 'region' }}>
            <Checkbox theme={theme} label="Show Marker Control" checked={this.state.isMarkerShown} onChange={() => this.setState({ isMarkerShown: !this.state.isMarkerShown, enableSave: true })} />
            <Checkbox theme={theme} label="Show Zoom Control" checked={this.state.isZoomControlShown} onChange={() => this.setState({ isZoomControlShown: !this.state.isZoomControlShown, enableSave: true })} />
            <Checkbox theme={theme} label="Show Street View Control" checked={this.state.isStreetViewControlShown} onChange={() => this.setState({ isStreetViewControlShown: !this.state.isStreetViewControlShown, enableSave: true })} />
            <Checkbox theme={theme} label="Allow Dragging" checked={this.state.isDraggingAllowed} onChange={() => this.setState({ isDraggingAllowed: !this.state.isDraggingAllowed, enableSave: true })} />
          </SettingsSection>

          {!WixUtils.isMobile() && saveButton}
        </div>
      </div>
    );
  }
}

MapSettingsModal.propTypes = {
  pubsub: PropTypes.object,
  helpers: PropTypes.object.isRequired,
  componentData: PropTypes.object.isRequired,
  onConfirm: PropTypes.func,
  theme: PropTypes.object.isRequired,
  t: PropTypes.func,
};
