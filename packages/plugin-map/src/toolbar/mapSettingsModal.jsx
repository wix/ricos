import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  mergeStyles,
  WixUtils,
  SettingsSection,
  TextInput,
  Checkbox,
  Button,
  Dropdown
} from 'wix-rich-content-common';
import ReactGoogleMapLoader from 'react-google-maps-loader';
import ReactGooglePlacesSuggest from 'react-google-places-suggest';
import styles from '../../statics/styles/map-settings-modal.scss';

const mapModes = [{
  value: 'roadmap',
  label: 'Roadmap'
}, {
  value: 'terrain',
  label: 'Terrain'
}, {
  value: 'satellite',
  label: 'Satellite'
}];

export class MapSettingsModal extends Component {
  constructor(props) {
    super(props);
    const { componentData } = this.props;

    this.styles = mergeStyles({ styles, theme: props.theme });
    this.state = {
      locationSearchPhrase: '',
      address: componentData.map.address,
      lat: componentData.map.lat,
      lng: componentData.map.lng,
      mode: componentData.map.mode,
      isMarkerShown: componentData.map.isMarkerShown,
      isZoomControlShown: componentData.map.isZoomControlShown,
      isStreetViewControlShown: componentData.map.isStreetViewControlShown,
      isDraggingAllowed: componentData.map.isDraggingAllowed,
      isLocationInputAlreadyFocused: false,
    };
    this.state.locationDisplayName = this.state.address;
  }

  onLocationInputChange = e => this.setState({ locationSearchPhrase: e.target.value, address: e.target.value });

  onLocationSuggestSelect = (geocodedPrediction, originalPrediction) => {
    this.setState({
      locationSearchPhrase: '',
      address: originalPrediction.description,
      locationDisplayName: originalPrediction.description,
      lat: geocodedPrediction.geometry.location.lat(),
      lng: geocodedPrediction.geometry.location.lng()
    });
  }

  onSaveBtnClick = () => {
    const { componentData, onConfirm, pubsub, helpers } = this.props;
    const newComponentData = {
      map: {
        address: this.state.address,
        lat: this.state.lat,
        lng: this.state.lng,
        mode: this.state.mode,
        isMarkerShown: this.state.isMarkerShown,
        isZoomControlShown: this.state.isZoomControlShown,
        isStreetViewControlShown: this.state.isStreetViewControlShown,
        isDraggingAllowed: this.state.isDraggingAllowed
      }
    };

    if (onConfirm) {
      onConfirm({ ...componentData, ...newComponentData });
    } else {
      pubsub.update('componentData', { ...newComponentData });
    }

    if (helpers) {
      helpers.openModal(data => pubsub.update('componentData', { metadata: { ...data } }));
    }

    this.closeModal();
  };

  closeModal = () => this.props.helpers.closeModal();

  render() {
    const { theme, t, googleMapApiKey } = this.props;
    const { locationSearchPhrase, address } = this.state;

    const backButton =
      (<div
        className={styles.map_settings_modal_mobile_backButton}
        onClick={this.closeModal}
        role="button"
        tabIndex="0"
        onKeyPress={this.closeModal}
      />);

    const saveButton = (
      <Button
        className={styles.map_settings_modal_save_button}
        onClick={this.onSaveBtnClick}
        ariaProps={{ 'aria-label': 'Save Button', role: 'button' }}
        theme={theme}
      >
        Save
      </Button>
    );

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

          <SettingsSection
            theme={theme}
            className={styles.map_settings_modal_section}
            ariaProps={{ 'aria-label': 'location', role: 'region' }}
          >
            <div className={styles.map_settings_modal_location_label}>{t('MapSettings_Location_Input_Label')}</div>
            <ReactGoogleMapLoader
              params={{
                key: googleMapApiKey,
                libraries: 'places,geocode',
              }}
              render={googleMaps =>
                googleMaps && (
                  <div>
                    <ReactGooglePlacesSuggest
                      autocompletionRequest={{ input: locationSearchPhrase }}
                      googleMaps={googleMaps}
                      onSelectSuggest={this.onLocationSuggestSelect}
                    >
                      <TextInput
                        tabIndex="0"
                        theme={styles}
                        type="option"
                        placeholder={t('MapSettings_Location_Input_Placeholder')}
                        value={address}
                        onChange={this.onLocationInputChange}
                        inputRef={ref => {
                          // TODO: since this is a common logic, move it to the TextInput component, and encapsulate it in a prop
                          if (ref !== null && !this.state.isLocationInputAlreadyFocused) {
                            ref.focus();
                            ref.setSelectionRange(0, ref.value.length);
                            this.setState({ isLocationInputAlreadyFocused: true });
                          }
                        }}
                      />
                    </ReactGooglePlacesSuggest>
                  </div>
                )
              }
            />
          </SettingsSection>

          <SettingsSection
            theme={theme}
            className={styles.map_settings_modal_section}
            ariaProps={{ 'aria-label': 'location', role: 'region' }}
          >
            <div className={styles.map_settings_modal_location_label}>{t('MapSettings_Location_Display_Name')}</div>
            <TextInput
              type="text"
              value={this.state.locationDisplayName}
              onChange={e => this.setState({ locationDisplayName: e.target.value })}
              theme={theme}
            />
          </SettingsSection>

          <SettingsSection
            theme={theme}
            className={styles.map_settings_modal_dropdown_section}
            ariaProps={{ 'aria-label': 'ckeckboxes', role: 'region' }}
          >
            <Dropdown
              placeholder="Mode .."
              theme={theme}
              value={this.state.mode}
              options={mapModes}
              onChange={option => this.setState({ mode: option.value })}
            />
          </SettingsSection>

          <SettingsSection
            theme={theme}
            className={styles.map_settings_modal_checkbox_section}
            ariaProps={{ 'aria-label': 'ckeckboxes', role: 'region' }}
          >
            <Checkbox
              theme={theme}
              label="Show Marker Control"
              checked={this.state.isMarkerShown}
              onChange={() => this.setState({ isMarkerShown: !this.state.isMarkerShown })}
            />

            <Checkbox
              theme={theme}
              label="Show Zoom Control"
              checked={this.state.isZoomControlShown}
              onChange={() => this.setState({ isZoomControlShown: !this.state.isZoomControlShown })}
            />

            <Checkbox
              theme={theme}
              label="Show Street View Control"
              checked={this.state.isStreetViewControlShown}
              onChange={() => this.setState({ isStreetViewControlShown: !this.state.isStreetViewControlShown })}
            />

            <Checkbox
              theme={theme}
              label="Allow Dragging"
              checked={this.state.isDraggingAllowed}
              onChange={() => this.setState({ isDraggingAllowed: !this.state.isDraggingAllowed })}
            />

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
  googleMapApiKey: PropTypes.string.isRequired,
  t: PropTypes.func,
};
