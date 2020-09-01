import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { mergeStyles } from 'wix-rich-content-common';
import { SettingsSection, SettingsPanelFooter, TextInput } from 'wix-rich-content-plugin-commons';
import ReactGoogleMapLoader from 'react-google-maps-loader';
import ReactGooglePlacesSuggest from 'react-google-places-suggest';
import styles from '../../statics/styles/map-settings-modal.scss';
import { LabeledToggle } from './LabeledToggle';
import { SearchIcon } from '../icons/SearchIcon';
import { Scrollbars } from 'react-custom-scrollbars';
import classNames from 'classnames';

export class MapSettingsModal extends Component {
  constructor(props) {
    super(props);
    const { componentData } = this.props;

    this.styles = mergeStyles({ styles, theme: props.theme });

    this.state = {
      locationSearchPhrase: '',
      address: componentData.mapSettings.address,
      lat: componentData.mapSettings.lat,
      lng: componentData.mapSettings.lng,
      mode: componentData.mapSettings.mode,
      isMarkerShown: componentData.mapSettings.isMarkerShown,
      isZoomControlShown: componentData.mapSettings.isZoomControlShown,
      isStreetViewControlShown: componentData.mapSettings.isStreetViewControlShown,
      isDraggingAllowed: componentData.mapSettings.isDraggingAllowed,
      isViewControlShown: componentData.mapSettings.isViewControlShown,
      locationDisplayName: componentData.mapSettings.locationDisplayName,
      isLocationInputAlreadyFocused: false,
    };
  }

  onLocationInputChange = value => this.setState({ locationSearchPhrase: value, address: value });

  onLocationSuggestSelect = (geocodedPrediction, originalPrediction) =>
    this.setState({
      locationSearchPhrase: '',
      address: originalPrediction.description,
      locationDisplayName: originalPrediction.description,
      lat: geocodedPrediction.geometry.location.lat(),
      lng: geocodedPrediction.geometry.location.lng(),
    });

  onSaveBtnClick = () => {
    const { componentData, onConfirm, pubsub, helpers } = this.props;
    const newComponentData = {
      mapSettings: {
        address: this.state.address,
        locationDisplayName: this.state.locationDisplayName,
        lat: this.state.lat,
        lng: this.state.lng,
        mode: this.state.mode,
        isMarkerShown: this.state.isMarkerShown,
        isZoomControlShown: this.state.isZoomControlShown,
        isStreetViewControlShown: this.state.isStreetViewControlShown,
        isViewControlShown: this.state.isViewControlShown,
        isDraggingAllowed: this.state.isDraggingAllowed,
      },
    };

    if (onConfirm) {
      onConfirm({ ...componentData, ...newComponentData });
    } else {
      pubsub.update('componentData', { ...newComponentData });
    }

    helpers.openModal(data => pubsub.update('componentData', { metadata: { ...data } }));
    helpers.closeModal();
  };

  renderMobileNavBar() {
    const mobileCancelButton = (
      <div
        onClick={this.props.helpers.closeModal}
        role="button"
        tabIndex={0}
        onKeyPress={e => e.key === 'Enter' && this.props.helpers.closeModal()}
        className={this.styles.map_settings_modal_mobile_navbar_cancel_button}
      >
        <p>Cancel</p>
      </div>
    );

    const mobileSaveButton = (
      <div
        onClick={this.onSaveBtnClick}
        role="button"
        tabIndex={0}
        onKeyPress={e => e.key === 'Enter' && this.onSaveBtnClick()}
        className={this.styles.map_settings_modal_mobile_navbar_save_button}
      >
        <p>Save</p>
      </div>
    );

    return (
      <div
        className={classNames(
          this.styles.map_settings_modal_mobile_navbar,
          this.styles.map_settings_modal_mobile_navbar_wrapper
        )}
      >
        {mobileCancelButton}
        {mobileSaveButton}
      </div>
    );
  }

  toggleState = key => () => {
    this.setState(prevState => ({
      [key]: !prevState[key],
    }));
  };

  renderToggle = ({ toggleKey, labelKey }) => (
    <LabeledToggle
      theme={this.props.theme}
      checked={this.state[toggleKey]}
      label={this.props.t(labelKey)}
      onChange={this.toggleState(toggleKey)}
    />
  );

  toggleData = [
    {
      toggleKey: 'isViewControlShown',
      labelKey: 'MapSettings_MapOption_Show_View_Control_Label',
    },
    {
      toggleKey: 'isMarkerShown',
      labelKey: 'MapSettings_MapOption_Show_Marker_Label',
    },
    {
      toggleKey: 'isZoomControlShown',
      labelKey: 'MapSettings_MapOption_Show_Zoom_Label',
    },
    {
      toggleKey: 'isStreetViewControlShown',
      labelKey: 'MapSettings_MapOption_Show_Street_View_Label',
    },
    {
      toggleKey: 'isDraggingAllowed',
      labelKey: 'MapSettings_MapOption_Allow_Dragging_Label',
    },
  ];

  renderSettingsSections() {
    const { theme, t, isMobile } = this.props;
    const { locationSearchPhrase, address } = this.state;
    const { googleMapApiKey } = this.props.settings;

    return (
      <div
        className={classNames(
          this.styles.map_settings_modal_settings,
          this.styles.map_settings_modal_main_content_block
        )}
      >
        <SettingsSection
          theme={theme}
          className={this.styles.map_settings_modal_location_input_settings_section}
          ariaProps={{ 'aria-label': 'location', role: 'region' }}
        >
          <div className={this.styles.map_settings_modal_text_input_label}>
            <label htmlFor="location-input">{t('MapSettings_Location_Input_Label')}</label>
          </div>
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
                    customRender={prediction =>
                      prediction ? (
                        <p className={this.styles.map_settings_modal_location_suggestion}>
                          {prediction.description}
                        </p>
                      ) : (
                          <p className={this.styles.map_settings_modal_location_suggestion}>
                            {t('MapSettings_Location_Suggestion_Input_No_Results_Found')}
                          </p>
                        )
                    }
                  >
                    <div className={this.styles.map_settings_modal_search_icon_wrapper}>
                      <div className={this.styles.map_settings_modal_search_icon}>
                        <SearchIcon />
                      </div>
                      <TextInput
                        tabIndex="0"
                        theme={this.styles}
                        type="option"
                        placeholder={t('MapSettings_Location_Input_Placeholder')}
                        value={address}
                        id="location-input"
                        autoComplete="off"
                        onChange={this.onLocationInputChange}
                        inputRef={ref => {
                          // TODO: since this is a common logic, move it to the TextInput component, and encapsulate it in a prop
                          if (ref !== null && !this.state.isLocationInputAlreadyFocused) {
                            ref.focus();
                            this.setState({ isLocationInputAlreadyFocused: true });
                          }
                        }}
                      />
                    </div>
                  </ReactGooglePlacesSuggest>
                </div>
              )
            }
          />
        </SettingsSection>

        <SettingsSection
          theme={theme}
          className={this.styles.map_settings_modal_location_display_name_settings_section}
          ariaProps={{ 'aria-label': 'location', role: 'region' }}
        >
          <div className={this.styles.map_settings_modal_text_input_label}>
            <label htmlFor="location-display-name">{t('MapSettings_Location_Display_Name')}</label>
          </div>
          <TextInput
            type="text"
            id="location-display-name"
            value={this.state.locationDisplayName}
            onChange={locationDisplayName => this.setState({ locationDisplayName })}
            theme={this.styles}
            autoComplete="off"
          />
        </SettingsSection>

        {!isMobile && (
          <div className={this.styles.map_settings_modal_divider_wrapper}>
            <div className={this.styles.map_settings_modal_divider} />
          </div>
        )}

        <SettingsSection
          theme={theme}
          className={this.styles.map_settings_modal_checkbox_section}
          ariaProps={{ 'aria-label': 'ckeckboxes', role: 'region' }}
        >
          <div className={this.styles.map_settings_modal_map_options}>
            <p className={this.styles.map_settings_modal_map_options_sub_header}>
              {t('MapSettings_MapOption_SubHeader')}
            </p>
            {this.toggleData.map(toggle => this.renderToggle(toggle))}
          </div>
        </SettingsSection>
      </div>
    );
  }

  render() {
    const { t, isMobile, languageDir } = this.props;

    const wrapWithScrollBars = jsx => (
      <Scrollbars
        renderThumbVertical={() => (
          <div className={this.styles.map_settings_modal_scrollbar_thumb} />
        )}
        className={this.styles.map_settings_modal_scrollbar_container}
      >
        {jsx}
      </Scrollbars>
    );

    return (
      <div dir={languageDir}>
        {isMobile && this.renderMobileNavBar()}

        <div className={this.styles.map_settings_modal_settings_container} data-hook="mapSettings">
          <div
            className={classNames(
              this.styles.map_settings_modal_title_container,
              this.styles.map_settings_modal_main_content_block
            )}
          >
            <h3 className={this.styles.map_settings_modal_title}>{t('MapSettings_Title')}</h3>
          </div>

          {isMobile
            ? this.renderSettingsSections()
            : wrapWithScrollBars(this.renderSettingsSections())}

          {!isMobile && (
            <SettingsPanelFooter
              fixed
              cancel={this.props.helpers.closeModal}
              save={this.onSaveBtnClick}
              theme={this.props.theme}
              t={t}
            />
          )}
        </div>
      </div>
    );
  }
}

MapSettingsModal.propTypes = {
  pubsub: PropTypes.object,
  helpers: PropTypes.object.isRequired,
  componentData: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired,
  onConfirm: PropTypes.func,
  theme: PropTypes.object.isRequired,
  t: PropTypes.func,
  isMobile: PropTypes.bool,
  languageDir: PropTypes.string,
};
