import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import isEmpty from 'lodash/isEmpty';
import { getScaleToFillImageURL } from 'image-client-api/dist/imageClientSDK';
import {
  mergeStyles,
  FileInput,
  Image,
  InputWithLabel,
  LinkPanel,
  SettingsSection,
  SettingsPanelFooter,
  FocusManager
} from 'wix-rich-content-common';
import { BackIcon } from '../../icons';
import styles from '../../../statics/styles/gallery-image-settings.scss';
import GallerySettingsMobileHeader from './gallery-settings-mobile-header';
import { isUndefined } from 'util';

class ImageSettings extends Component {

  constructor(props) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
    const { t } = props;
    this.updateLabel = t('GalleryImageSettings_Update');
    this.headerLabel = t('GalleryImageSettings_Header');
    this.ReplaceLabel = t('GalleryImageSettings_Replace_Label');
    this.deleteLabel = t('GalleryImageSettings_Delete_Label');
    this.titleLabel = t('GalleryImageSettings_Title_Label');
    this.titleInputPlaceholder = t('GalleryImageSettings_Title_Input_Placeholder');
    this.linkLabel = t('GalleryImageSettings_Link_Label');
  }

  deleteImage() {
    this.props.onDeleteImage();
  }

  replaceItem = event => {
    this.props.handleFileChange(event);
  }

  getImageUrl = image => getScaleToFillImageURL(('media/' + image.url), image.metadata.width, image.metadata.height, 420, 240);

  onImageIntermediateUrlChange = intermediateUrl => {
    const { onUpdateImage, selectedImage } = this.props;
    const metadata = selectedImage.metadata || {};
    metadata.link = selectedImage.metadata.link || {};
    metadata.link.intermediateUrl = intermediateUrl;
    onUpdateImage(metadata);
  };

  onImageUrlChange = () => {
    const { onUpdateImage, selectedImage } = this.props;
    const metadata = selectedImage.metadata || {};
    metadata.link = selectedImage.metadata.link || {};
    metadata.link.url = selectedImage.metadata.link.intermediateUrl;
    onUpdateImage(metadata);
  };

  onImageTargetChange = isBlank => {
    const { onUpdateImage, selectedImage } = this.props;
    const metadata = selectedImage.metadata || {};
    metadata.link = selectedImage.metadata.link || {};
    metadata.link.target = isBlank ? '_blank' :
      this.props.anchorTarget ? this.props.anchorTarget : '_self';
    onUpdateImage(metadata);
  };

  onImageRelChange = isNofollow => {
    const { onUpdateImage, selectedImage } = this.props;
    const metadata = selectedImage.metadata || {};
    metadata.link = selectedImage.metadata.link || {};
    metadata.link.rel = isNofollow ? 'nofollow' :
      this.props.relValue ? this.props.relValue : 'noopener';
    onUpdateImage(metadata);
  };

  onValidateUrl = isValid => {
    const { onUpdateImage, selectedImage } = this.props;
    const metadata = selectedImage.metadata || {};
    metadata.link = selectedImage.metadata.link || {};
    metadata.link.isValidUrl = isValid;
    onUpdateImage(metadata);
  };

  render() {
    const styles = this.styles;
    const {
      selectedImage,
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
      onUpdateImage,
      visibleLeftArrow,
      visibleRightArrow,
    } = this.props;

    const { url, target, rel, intermediateUrl } = selectedImage && !isEmpty(selectedImage.metadata.link) ? selectedImage.metadata.link : {};
    const targetBlank = target === '_blank' || isUndefined(target);
    const nofollow = rel === 'nofollow';

    // TODO: hide nav buttons on first/last image
    /* eslint-disable jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/click-events-have-key-events */
    return (
      <FocusManager className={styles.galleryImageSettings}>
        <div className={styles.galleryImageSettings_content}>
          {isMobile ?
            <GallerySettingsMobileHeader
              theme={theme}
              cancel={onCancel}
              save={onSave}
              saveName={this.updateLabel}
              t={t}
            /> :
            <h3
              className={classNames(styles.galleryImageSettings_backButton, styles.galleryImageSettings_title)}
              data-hook="galleryImageSettingsHeader" onClick={onCancel}
            >
              <BackIcon className={styles.galleryImageSettings_backIcon} />{this.headerLabel}
            </h3>
          }
          <div
            className={classNames(styles.galleryImageSettings_scrollContainer,
              { [styles.galleryImageSettings_scrollContainer_mobile]: isMobile })}
          >
            {selectedImage &&
            <div>
              <SettingsSection theme={theme} ariaProps={{ 'aria-label': 'image navigation', role: 'region' }}>
                <Image
                  alt={selectedImage.metadata.title || 'gallery image preview'} resizeMode={'contain'}
                  className={styles.galleryImageSettings_image} src={this.getImageUrl(selectedImage)} theme={theme}
                />
                <div className={classNames(styles.galleryImageSettings_nav, { [styles.galleryImageSettings_nav_mobile]: isMobile })}>
                  <button
                    className={classNames(styles.galleryImageSettings_previous,
                      { [styles.galleryImageSettings_hidden]: !visibleLeftArrow })} aria-label="previous image"
                    data-hook="galleryImageSettingsPrevious" onClick={onPreviousImage}
                  />
                  <button
                    className={classNames(styles.galleryImageSettings_next,
                      { [styles.galleryImageSettings_hidden]: !visibleRightArrow })} aria-label="next image"
                    data-hook="galleryImageSettingsNext" onClick={onNextImage}
                  />
                </div>
              </SettingsSection>
              <div className={styles.galleryImageSettings_manageImageGrid}>
                <FileInput
                  className={styles.galleryImageSettings_replace} handleFileSelection={handleFileSelection}
                  dataHook="galleryImageSettingsFileInput" onChange={this.replaceItem} theme={theme} title={this.ReplaceLabel}
                >
                  <span className={styles.galleryImageSettings_replace_text}>{this.ReplaceLabel}</span>
                </FileInput>
                <button
                  className={styles.galleryImageSettings_delete} aria-label="delete image"
                  data-hook="galleryImageSettingsDeleteImage" onClick={onDeleteImage}
                >
                  <span className={styles.galleryImageSettings_delete_text}>{this.deleteLabel}</span>
                </button>
              </div>
              <SettingsSection
                ariaProps={{ 'aria-label': 'image properties', role: 'region' }}
                theme={theme} className={styles.galleryImageSettings_section}
              >
                <InputWithLabel
                  theme={theme}
                  id="galleryImageTitleInput"
                  label={this.titleLabel}
                  placeholder={this.titleInputPlaceholder}
                  value={selectedImage.metadata.title || ''}
                  dataHook="galleryImageTitleInput" onChange={event => onUpdateImage({ title: event.target.value })}
                />
              </SettingsSection>
              <SettingsSection
                ariaProps={{ 'aria-label': 'image link', role: 'region' }}
                theme={theme} className={this.styles.galleryImageSettings_section}
              >
                <span id="gallery_image_link_lbl" className={this.styles.inputWithLabel_label}>{this.linkLabel}</span>
                <LinkPanel
                  theme={theme} url={url} targetBlank={targetBlank} nofollow={nofollow} anchorTarget={anchorTarget} relValue={relValue}
                  isImageSettings t={t} ariaProps={{ 'aria-labelledby': 'gallery_image_link_lbl' }} intermediateUrl={intermediateUrl}
                  onIntermediateUrlChange={this.onImageIntermediateUrlChange} onValidateUrl={this.onValidateUrl}
                  onUrlChange={this.onImageUrlChange} onTargetBlankChange={this.onImageTargetChange} onNofollowChange={this.onImageRelChange}
                />
              </SettingsSection>
            </div>}

          </div>
          {isMobile ? null : <SettingsPanelFooter
            fixed
            theme={theme}
            className={styles.galleryImageSettings_footer}
            cancel={onCancel}
            save={onSave}
            t={t}
          />
          }
        </div>
      </FocusManager>
    );
    /* eslint-enable jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/click-events-have-key-events */
  }
}

ImageSettings.propTypes = {
  selectedImage: PropTypes.any,
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
};

export default ImageSettings;
