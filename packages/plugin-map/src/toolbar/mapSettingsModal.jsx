import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  mergeStyles,
  WixUtils,
  SettingsSection,
  TextInput,
  Button,
} from 'wix-rich-content-common';
import ReactGoogleMapLoader from 'react-google-maps-loader';
import ReactGooglePlacesSuggest from 'react-google-places-suggest';
import styles from '../../statics/styles/map-settings-modal.scss';
import { LabeledImage } from './LabeledImage';
import { LabeledToggle } from './LabeledToggle';
import { SearchIcon } from '../icons/SearchIcon';
import satelliteImg from '../../statics/images/satellite.png';
import terrainImg from '../../statics/images/terrain.png';
import roadmapImg from '../../statics/images/roadmap.png';
import { Scrollbars } from 'react-custom-scrollbars';
import classNames from 'classnames';
const uuidv4 = require('uuid/v4');

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
      isLocationInputAlreadyFocused: false,
    };
    this.state.locationDisplayName = componentData.mapSettings.locationDisplayName || this.state.address;

    this.uniqueClassesId = uuidv4();
  }

  onLocationInputChange = e => this.setState({ locationSearchPhrase: e.target.value, address: e.target.value });

  onLocationSuggestSelect = (geocodedPrediction, originalPrediction) => this.setState({
    locationSearchPhrase: '',
    address: originalPrediction.description,
    locationDisplayName: originalPrediction.description,
    lat: geocodedPrediction.geometry.location.lat(),
    lng: geocodedPrediction.geometry.location.lng()
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

  labeledToggleDefaultProps = () => ({
    sliderColor: this.props.uiSettings.themeColors.color1,
    toggleIsOnTrackColor: this.props.uiSettings.themeColors.color8,
    toggleIsOffTrackColor: this.props.uiSettings.themeColors.color8,
  })

  renderMobileNavBar() {
    const mobileCancelButton = (
      <div
        onClick={this.closeModal}
        role="button"
        tabIndex={0}
        onKeyPress={e => e.key === 'Enter' && this.closeModal()}
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
      <div className={this.styles.map_settings_modal_mobile_navbar}>
        {mobileCancelButton}
        {mobileSaveButton}
      </div>
    );
  }



  renderInjectedStyles = () => {
    const { themeColors } = this.props.uiSettings;

    const uniqueClassesId = this.uniqueClassesId;

    const buttonPrimaryClassName = `map_settings_modal_button_primary_${uniqueClassesId}`;
    const buttonSecondaryClassName = `map_settings_modal_button_secondary_${uniqueClassesId}`;
    const textInputClassName = `map_settings_modal_text_input_${uniqueClassesId}`;

    this.styles.button_primary = `${buttonPrimaryClassName} ${this.styles.button_primary}`;
    this.styles.button_secondary = `${buttonSecondaryClassName} ${this.styles.button_secondary}`;
    this.styles.textInput_input = `${textInputClassName} ${this.styles.textInput_input}`;

    const style = `
      .${buttonPrimaryClassName} {
        background: ${themeColors.color8};
      }

      .${buttonPrimaryClassName}:hover {
        color: ${themeColors.color1};
      }

      .${buttonSecondaryClassName} {
        border: 1px solid ${themeColors.color8};
        color: ${themeColors.color8};
      }

      .${buttonSecondaryClassName}:hover {
        color: ${themeColors.color8};
      }

      .${textInputClassName} {
        border-color: ${themeColors.color5};
      }
    `;

    return <style>{style}</style>;
  }

  renderSettingsSections() {
    const { theme, t } = this.props;
    const { locationSearchPhrase, address } = this.state;
    const { googleMapApiKey } = this.props.componentData;

    const selectedLabeledImageStyle = { border: '2px solid #9a87ce' };

    return (
      <div className={classNames(this.styles.map_settings_modal_settings, this.styles.map_settings_modal_main_content_block)}>
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
                    customRender={prediction => prediction ?
                      <p className={this.styles.map_settings_modal_location_suggestion}>{prediction.description}</p> :
                      <p className={this.styles.map_settings_modal_location_suggestion}>
                        {t('MapSettings_Location_Suggestion_Input_No_Results_Found')}
                      </p>
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
            onChange={e => this.setState({ locationDisplayName: e.target.value })}
            theme={this.styles}
            autoComplete="off"
          />
        </SettingsSection>

        {!WixUtils.isMobile() &&
        <div className={this.styles.map_settings_modal_divider_wrapper}>
          <div className={this.styles.map_settings_modal_divider} />
        </div>}

        <SettingsSection
          theme={theme}
          className={this.styles.map_settings_modal_dropdown_section}
          ariaProps={{ 'aria-label': 'ckeckboxes', role: 'region' }}
        >

          <div>
            <p className={this.styles.map_settings_modal_map_modes_sub_header}>{t('MapSettings_MapType_Label')}</p>
            <div className={this.styles.map_settings_modal_map_modes} >
              <LabeledImage
                label={t('MapSettings_MapType_RoadMap_Label')}
                src={roadmapImg}
                onClick={() => this.setState({ mode: 'roadmap' })}
                imgStyle={this.state.mode === 'roadmap' ? selectedLabeledImageStyle : {}}
                theme={theme}
              />

              <LabeledImage
                label={t('MapSettings_MapType_Satellite_Label')}
                src={satelliteImg}
                onClick={() => this.setState({ mode: 'satellite' })}
                imgStyle={this.state.mode === 'satellite' ? selectedLabeledImageStyle : {}}
                theme={theme}
              />

              <LabeledImage
                label={t('MapSettings_MapType_Terrain_Label')}
                src={terrainImg}
                onClick={() => this.setState({ mode: 'terrain' })}
                imgStyle={this.state.mode === 'terrain' ? selectedLabeledImageStyle : {}}
                theme={theme}
              />
            </div>
          </div>
        </SettingsSection>


        <div className={this.styles.map_settings_modal_divider_wrapper}><div className={this.styles.map_settings_modal_divider} /></div>

        <SettingsSection
          theme={theme}
          className={this.styles.map_settings_modal_checkbox_section}
          ariaProps={{ 'aria-label': 'ckeckboxes', role: 'region' }}
        >

          <div className={this.styles.map_settings_modal_map_options}>
            <LabeledToggle
              label={t('MapSettings_MapOption_Show_Marker_Label')}
              checked={this.state.isMarkerShown}
              onChange={() => this.setState({ isMarkerShown: !this.state.isMarkerShown })}
              {...this.labeledToggleDefaultProps()}
              theme={theme}
            />

            <LabeledToggle
              label={t('MapSettings_MapOption_Show_Zoom_Label')}
              checked={this.state.isZoomControlShown}
              onChange={() => this.setState({ isZoomControlShown: !this.state.isZoomControlShown })}
              {...this.labeledToggleDefaultProps()}
              theme={theme}
            />

            <LabeledToggle
              label={t('MapSettings_MapOption_Show_Street_View_Label')}
              checked={this.state.isStreetViewControlShown}
              onChange={() => this.setState({ isStreetViewControlShown: !this.state.isStreetViewControlShown })}
              {...this.labeledToggleDefaultProps()}
              theme={theme}
            />

            <LabeledToggle
              label={t('MapSettings_MapOption_Allow_Dragging_Label')}
              checked={this.state.isDraggingAllowed}
              onChange={() => this.setState({ isDraggingAllowed: !this.state.isDraggingAllowed })}
              {...this.labeledToggleDefaultProps()}
              theme={theme}
            />
          </div>
        </SettingsSection>
      </div>
    );
  }

  render() {
    const { t } = this.props;

    const wrapWithScrollBars = jsx => (
      <Scrollbars
        renderThumbVertical={() => <div className={this.styles.map_settings_modal_scrollbar_thumb} />}
        className={this.styles.map_settings_modal_scrollbar_container}
      >
        {jsx}
      </Scrollbars>
    );

    return (
      <div>
        {this.renderInjectedStyles()}
        {WixUtils.isMobile() && this.renderMobileNavBar()}

        <div className={this.styles.map_settings_modal_settings_container}>

          <div className={classNames(this.styles.map_settings_modal_title_container, this.styles.map_settings_modal_main_content_block)}>
            <div className={this.styles.map_settings_modal_title}>{t('MapSettings_Title')}</div>
          </div>

          {WixUtils.isMobile() ? this.renderSettingsSections() : wrapWithScrollBars(this.renderSettingsSections())}

          {!WixUtils.isMobile() &&
            <div className={classNames(this.styles.map_settings_modal_footer, this.styles.map_settings_modal_main_content_block)}>
              <Button type="secondary" onClick={this.closeModal} theme={this.styles} className={this.styles.map_settings_modal_footer_cancel_button}>
              Cancel
              </Button>
              <Button type="primary" onClick={this.onSaveBtnClick} theme={this.styles} className={this.styles.map_settings_modal_footer_save_button}>
              Save
              </Button>
            </div>}
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
  uiSettings: PropTypes.object.isRequired,
  t: PropTypes.func,
};
