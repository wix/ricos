/* eslint-disable no-undef */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {
  mergeStyles,
  SettingsSection,
  SettingsPanelFooter,
  LinkPanel,
  InputWithLabel,
  Image,
} from 'wix-rich-content-common';
import ImageSettingsNavbar from '../components/image-settings-navbar';
import styles from '../../statics/styles/unsplash-image-settings-modal.scss';

class UnsplashImageSettingsModal extends PureComponent {
  constructor(props) {
    super(props);
    const {
      t,
      componentData: { image },
    } = this.props;

    this.styles = mergeStyles({ styles, theme: props.theme });
    this.state = {
      caption: image.caption || '',
      alt: image.alt || '',
      isValidUrl: image.isValidUrl || true,
      isValid: true,
      nofollow: image.nofollow || false,
      targetBlank: image.targetBlank || false,
      url: image.url || '',
    };

    this.updateLabel = t('ImageSettings_Update');
    this.headerText = t('ImageSettings_Header');
    this.captionLabel = t('ImageSettings_Caption_Label');
    this.captionInputPlaceholder = t('ImageSettings_Caption_Input_Placeholder');
    this.altLabel = t('ImageSettings_Alt_Label');
    this.altInputPlaceholder = t('ImageSettings_Alt_Input_Placeholder');
    this.linkLabel = t('ImageSettings_Link_Label');
  }

  onCaptionChanged = e => {
    this.setState({ caption: e.target.value });
  };

  onAltChanged = e => {
    this.setState({ alt: e.target.value });
  };

  onLinkPanelChanged = result => {
    this.setState({ ...result });
  };

  onSaveClicked = () => {
    const { componentData, helpers, pubsub } = this.props;
    const imageObj = {
      ...componentData.image,
      ...this.state,
    };
    pubsub.update('componentData', { image: imageObj });
    helpers.closeModal();
  };

  onCancelClicked = () => {
    this.props.helpers.closeModal();
  };

  render() {
    const { theme, isMobile, t, componentData, anchorTarget, relValue, uiSettings } = this.props;
    const { linkPanel } = uiSettings || {};
    const { targetBlank, nofollow, url, isValid } = this.state;
    const { blankTargetToggleVisibilityFn, nofollowRelToggleVisibilityFn } = linkPanel || {};
    const showTargetBlankCheckbox =
      blankTargetToggleVisibilityFn && blankTargetToggleVisibilityFn(anchorTarget);
    const showRelValueCheckbox =
      nofollowRelToggleVisibilityFn && nofollowRelToggleVisibilityFn(relValue);

    return (
      <div className={this.styles.unsplash_imageSettings} data-hook="imageSettings">
        {isMobile ? (
          <ImageSettingsNavbar
            t={t}
            theme={theme}
            cancel={() => this.onCancelClicked()}
            save={() => this.onSaveClicked()}
            saveName={this.updateLabel}
          />
        ) : (
          <h3 className={this.styles.unsplash_imageSettingsTitle}>{this.headerText}</h3>
        )}
        <div
          className={classNames(styles.unsplash_imageSettings_scrollContainer, {
            [styles.unsplash_imageSettings_mobile]: isMobile,
          })}
        >
          <SettingsSection
            theme={theme}
            ariaProps={{ 'aria-label': 'image preview', role: 'region' }}
          >
            <Image
              alt={'image preview'}
              resizeMode={'contain'}
              className={this.styles.unsplash_imageSettingsImage}
              src={componentData.image.originalUrl}
              theme={theme}
            />
          </SettingsSection>
          <SettingsSection
            theme={theme}
            className={this.styles.unsplash_imageSettingsSection}
            ariaProps={{ 'aria-label': 'image caption', role: 'region' }}
          >
            <InputWithLabel
              theme={theme}
              id="imageSettingsCaptionInput"
              label={this.captionLabel}
              placeholder={this.captionInputPlaceholder}
              value={this.state.caption}
              onChange={this.onCaptionChanged.bind(this)}
              dataHook="imageSettingsCaptionInput"
            />
          </SettingsSection>
          <SettingsSection
            theme={theme}
            className={this.styles.unsplash_imageSettingsSection}
            ariaProps={{ 'aria-label': 'image alt text', role: 'region' }}
          >
            <InputWithLabel
              theme={theme}
              id="imageSettingsAltInput"
              label={this.altLabel}
              placeholder={this.altInputPlaceholder}
              value={this.state.alt}
              onChange={this.onAltChanged.bind(this)}
              dataHook="imageSettingsAltInput"
            />
          </SettingsSection>
          <SettingsSection
            theme={theme}
            className={this.styles.unsplash_imageSettingsSection}
            ariaProps={{ 'aria-label': 'image link', role: 'region' }}
          >
            <span
              id="image_settings_link_lbl"
              className={this.styles.unsplash_inputWithLabel_label}
            >
              {this.linkLabel}
            </span>
            <LinkPanel
              linkValues={{ url, targetBlank, nofollow, isValid }}
              onChange={this.onLinkPanelChanged}
              showTargetBlankCheckbox={showTargetBlankCheckbox}
              showRelValueCheckbox={showRelValueCheckbox}
              theme={theme}
              t={t}
              ariaProps={{ 'aria-labelledby': 'unsplash_image_settings_link_lbl' }}
            />
          </SettingsSection>
        </div>
        {isMobile ? null : (
          <SettingsPanelFooter
            fixed
            theme={theme}
            cancel={this.onCancelClicked}
            save={this.onSaveClicked}
            t={t}
          />
        )}
      </div>
    );
  }
}

UnsplashImageSettingsModal.propTypes = {
  theme: PropTypes.object.isRequired,
  isMobile: PropTypes.bool,
  t: PropTypes.func,
  componentData: PropTypes.object,
  helpers: PropTypes.object,
  pubsub: PropTypes.object,
  relValue: PropTypes.string,
  anchorTarget: PropTypes.string,
  uiSettings: PropTypes.object,
};

export default UnsplashImageSettingsModal;
