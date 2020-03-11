import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import imageClientAPI from 'image-client-api';
import { mergeStyles } from 'wix-rich-content-common';
import {
  FileInput,
  Image,
  InputWithLabel,
  LinkPanel,
  SettingsSection,
  SettingsPanelFooter,
  FocusManager,
} from 'wix-rich-content-editor-common';
import { BackIcon, DeleteIcon, ReplaceIcon, NextIcon, PreviousIcon } from '../../icons';
import styles from '../../../statics/styles/gallery-image-settings.scss';
import GallerySettingsMobileHeader from './gallery-settings-mobile-header';

class ImageSettings extends Component {
  constructor(props) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
    const { t } = props;
    this.updateLabel = t('GalleryImageSettings_Update');
    this.headerLabel = t('GalleryImageSettings_Header');
    this.ReplaceLabel = t('GalleryImageSettings_Replace_Label');
    this.deleteLabel = t('GalleryImageSettings_Delete_Label');
    this.titleLabel = t('ImageSettings_Caption_Label');
    this.titleInputPlaceholder = t('ImageSettings_Caption_Input_Placeholder');
    this.altTextLabel = t('ImageSettings_Alt_Label');
    this.altTextPlaceholder = t('ImageSettings_Alt_Input_Placeholder');
    this.linkLabel = t('GalleryImageSettings_Link_Label');
  }

  deleteImage() {
    this.props.onDeleteImage();
  }

  replaceItem = files => {
    this.props.handleFileChange(files);
  };

  getImageUrl = image =>
    imageClientAPI.getScaleToFillImageURL(
      'media/' + image.url,
      image.metadata.width,
      image.metadata.height,
      420,
      240
    );

  onTitleChange = event => this.props.onUpdateImage({ title: event.target.value });
  onAltTextChange = event => this.props.onUpdateImage({ altText: event.target.value });

  onLinkPanelChange = linkPanelValues => {
    this.props.onUpdateImage({ link: this.linkPanelToLink(linkPanelValues) });
  };

  linkPanelToLink = ({ url, targetBlank, nofollow, isValid }) => ({
    url,
    target: targetBlank
      ? '_blank'
      : this.props.anchorTarget !== '_blank'
      ? this.props.anchorTarget
      : '_self',
    rel: nofollow
      ? 'nofollow'
      : this.props.relValue !== 'nofollow'
      ? this.props.relValue
      : 'noopener',
    isValid,
  });

  linkToLinkPanel = ({ url = '', target, rel, isValid }) => ({
    url,
    targetBlank: target ? target === '_blank' : this.props.anchorTarget === '_blank',
    nofollow: rel ? rel === 'nofollow' : this.props.relValue === 'nofollow',
    isValid,
  });
  render() {
    const styles = this.styles;
    const {
      image,
      handleFileSelection,
      onCancel,
      onSave,
      theme,
      isMobile,
      t,
      anchorTarget,
      relValue,
      onNextImage,
      onPreviousImage,
      onDeleteImage,
      visibleLeftArrow,
      visibleRightArrow,
      uiSettings,
    } = this.props;

    const { linkPanel } = uiSettings || {};
    const { blankTargetToggleVisibilityFn, nofollowRelToggleVisibilityFn, placeholder } =
      linkPanel || {};
    const showTargetBlankCheckbox =
      blankTargetToggleVisibilityFn && blankTargetToggleVisibilityFn(anchorTarget);
    const showRelValueCheckbox =
      nofollowRelToggleVisibilityFn && nofollowRelToggleVisibilityFn(relValue);

    const { metadata = {} } = image || {};

    const altText = typeof metadata.altText === 'string' ? metadata.altText : metadata.title;
    /* eslint-disable jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/click-events-have-key-events */
    return (
      <FocusManager className={styles.galleryImageSettings}>
        <div className={styles.galleryImageSettings_content}>
          {isMobile ? (
            <GallerySettingsMobileHeader
              theme={theme}
              cancel={onCancel}
              save={onSave}
              saveName={this.updateLabel}
              t={t}
            />
          ) : (
            <h3
              className={classNames(
                styles.galleryImageSettings_backButton,
                styles.galleryImageSettings_title
              )}
              data-hook="galleryImageSettingsHeader"
              onClick={onCancel}
            >
              <BackIcon className={styles.galleryImageSettings_backIcon} />
              {this.headerLabel}
            </h3>
          )}
          <div
            className={classNames(styles.galleryImageSettings_scrollContainer, {
              [styles.galleryImageSettings_scrollContainer_mobile]: isMobile,
            })}
          >
            {image && (
              <div>
                <SettingsSection
                  theme={theme}
                  ariaProps={{
                    'aria-label': 'image navigation',
                    role: 'region',
                    'data-hook': 'galleryImageSettingsPreview',
                  }}
                >
                  <Image
                    alt={metadata.title || 'gallery image preview'}
                    resizeMode={'contain'}
                    className={styles.galleryImageSettings_image}
                    src={this.getImageUrl(image)}
                    theme={theme}
                  />
                  <div
                    className={classNames(styles.galleryImageSettings_nav, {
                      [styles.galleryImageSettings_nav_mobile]: isMobile,
                    })}
                    data-hook="galleryImagePreview"
                  >
                    <button
                      className={classNames(styles.galleryImageSettings_previous, {
                        [styles.galleryImageSettings_hidden]: !visibleLeftArrow,
                      })}
                      aria-label="previous image"
                      data-hook="galleryImageSettingsPrevious"
                      onClick={onPreviousImage}
                    >
                      <PreviousIcon />
                    </button>
                    <button
                      className={classNames(styles.galleryImageSettings_next, {
                        [styles.galleryImageSettings_hidden]: !visibleRightArrow,
                      })}
                      aria-label="next image"
                      data-hook="galleryImageSettingsNext"
                      onClick={onNextImage}
                    >
                      <NextIcon />
                    </button>
                  </div>
                </SettingsSection>
                <div className={styles.galleryImageSettings_manageImageGrid}>
                  <FileInput
                    className={styles.galleryImageSettings_replace}
                    handleFileSelection={handleFileSelection}
                    dataHook="galleryImageSettingsFileInput"
                    onChange={this.replaceItem}
                    theme={theme}
                    title={this.ReplaceLabel}
                  >
                    <ReplaceIcon className={styles.galleryImageSettings_replace_icon} />
                    <span className={styles.galleryImageSettings_replace_text}>
                      {this.ReplaceLabel}
                    </span>
                  </FileInput>
                  <button
                    className={styles.galleryImageSettings_delete}
                    aria-label="delete image"
                    data-hook="galleryImageSettingsDeleteImage"
                    onClick={onDeleteImage}
                  >
                    <DeleteIcon className={styles.galleryImageSettings_delete_icon} />
                    <span className={styles.galleryImageSettings_delete_text}>
                      {this.deleteLabel}
                    </span>
                  </button>
                </div>
                <SettingsSection
                  ariaProps={{ 'aria-label': 'image properties', role: 'region' }}
                  theme={theme}
                  className={styles.galleryImageSettings_section}
                >
                  <InputWithLabel
                    theme={theme}
                    label={this.titleLabel}
                    placeholder={this.titleInputPlaceholder}
                    value={metadata.title}
                    maxLength={30}
                    dataHook="galleryImageTitleInput"
                    onChange={this.onTitleChange}
                  />
                  <InputWithLabel
                    theme={theme}
                    label={this.altTextLabel}
                    placeholder={this.altTextPlaceholder}
                    value={altText}
                    dataHook="galleryImageAltTextInput"
                    onChange={this.onAltTextChange}
                  />
                </SettingsSection>
                <SettingsSection
                  ariaProps={{ 'aria-label': 'image link', role: 'region' }}
                  theme={theme}
                  className={this.styles.galleryImageSettings_section}
                >
                  <span id="gallery_image_link_lbl" className={this.styles.inputWithLabel_label}>
                    {this.linkLabel}
                  </span>
                  <LinkPanel
                    linkValues={this.linkToLinkPanel(metadata.link || {})}
                    onChange={this.onLinkPanelChange}
                    showTargetBlankCheckbox={showTargetBlankCheckbox}
                    showRelValueCheckbox={showRelValueCheckbox}
                    theme={theme}
                    t={t}
                    ariaProps={{ 'aria-labelledby': 'gallery_image_link_lbl' }}
                    placeholder={placeholder}
                  />
                </SettingsSection>
              </div>
            )}
          </div>
          {isMobile ? null : (
            <SettingsPanelFooter
              fixed
              theme={theme}
              className={styles.galleryImageSettings_footer}
              cancel={onCancel}
              save={onSave}
              t={t}
            />
          )}
        </div>
      </FocusManager>
    );
    /* eslint-enable jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/click-events-have-key-events */
  }
}

ImageSettings.propTypes = {
  image: PropTypes.shape({
    url: PropTypes.string.isRequired,
    metadata: PropTypes.object.isRequired,
  }).isRequired,
  onCancel: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onDeleteImage: PropTypes.func.isRequired,
  onUpdateImage: PropTypes.func.isRequired,
  onNextImage: PropTypes.func.isRequired,
  onPreviousImage: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
  handleFileSelection: PropTypes.func,
  handleFileChange: PropTypes.func,
  isMobile: PropTypes.bool,
  t: PropTypes.func,
  anchorTarget: PropTypes.string,
  relValue: PropTypes.string,
  visibleLeftArrow: PropTypes.bool,
  visibleRightArrow: PropTypes.bool,
  uiSettings: PropTypes.object,
};

export default ImageSettings;
