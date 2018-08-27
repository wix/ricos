import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import isEmpty from 'lodash/isEmpty';
import findIndex from 'lodash/findIndex';
import pick from 'lodash/pick';
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
    this.state = this.propsToState(this.props);
    const { t } = props;
    this.updateLabel = t('GalleryImageSettings_Update');
    this.headerLabel = t('GalleryImageSettings_Header');
    this.ReplaceLabel = t('GalleryImageSettings_Replace_Label');
    this.deleteLabel = t('GalleryImageSettings_Delete_Label');
    this.titleLabel = t('GalleryImageSettings_Title_Label');
    this.titleInputPlaceholder = t('GalleryImageSettings_Title_Input_Placeholder');
    this.linkLabel = t('GalleryImageSettings_Link_Label');
  }

  propsToState(props) {
    return {
      selectedIndex: props.selectedImage ?
        findIndex(props.images, i => props.selectedImage.url === i.url) : -1,
      images: props.images
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.setState(this.propsToState(nextProps));
    }
  }

  componentDidMount() {
    this.initialImageState = this.props.images.map(i => ({ ...i }));
  }

  deleteImage(selectedImage) {
    const images = this.state.images.filter(i => i.itemId !== selectedImage.itemId);
    this.setState({
      images,
      selectedIndex: Math.min(this.state.selectedIndex, images.length - 1)
    });
  }

  imageMetadataUpdated = (image, value) => {
    image.metadata = Object.assign({}, image.metadata, value);
    this.setState({ images: this.state.images });
  };

  replaceItem = event => {
    const { handleFileChange } = this.props;
    const itemIdx = this.state.selectedIndex;
    handleFileChange(event, itemIdx);
  }

  onDoneClick = () => {
    const { onSave } = this.props;
    const images = this.state.images.reduce(
      (resultImages, image) => {
        if (image.metadata && image.metadata.link && image.metadata.link.url) {
          resultImages.push({ ...image,
            metadata: {
              ...image.metadata,
              link: pick(image.metadata.link, 'url', 'rel', 'target')
            }
          });
        } else {
          resultImages.push({ ...image, metadata: { ...image.metadata, link: null } });
        }
        return resultImages;
      }, []);
    onSave(images);
  }

  getImageUrl = image => getScaleToFillImageURL(('media/' + image.url), image.metadata.width, image.metadata.height, 420, 240);

  onImageIntermediateUrlChange = intermediateUrl => {
    const selectedImage = this.state.images[this.state.selectedIndex];
    selectedImage.metadata = selectedImage.metadata || {};
    selectedImage.metadata.link = selectedImage.metadata.link || {};
    selectedImage.metadata.link.intermediateUrl = intermediateUrl;
    this.setState({ images: this.state.images });
  };

  onImageUrlChange = () => {
    const selectedImage = this.state.images[this.state.selectedIndex];
    selectedImage.metadata = selectedImage.metadata || {};
    selectedImage.metadata.link = selectedImage.metadata.link || {};
    selectedImage.metadata.link.url = selectedImage.metadata.link.intermediateUrl;
    this.setState({ images: this.state.images });
  };

  onImageTargetChange = isBlank => {
    const selectedImage = this.state.images[this.state.selectedIndex];
    selectedImage.metadata = selectedImage.metadata || {};
    selectedImage.metadata.link = selectedImage.metadata.link || {};
    selectedImage.metadata.link.target = isBlank ? '_blank' :
      this.props.anchorTarget ? this.props.anchorTarget : '_self';
    this.setState({ images: this.state.images });
  };

  onImageRelChange = isNofollow => {
    const selectedImage = this.state.images[this.state.selectedIndex];
    selectedImage.metadata = selectedImage.metadata || {};
    selectedImage.metadata.link = selectedImage.metadata.link || {};
    selectedImage.metadata.link.rel = isNofollow ? 'nofollow' :
      this.props.relValue ? this.props.relValue : 'noopener';
    this.setState({ images: this.state.images });
  };

  onValidateUrl = isValid => {
    const selectedImage = this.state.images[this.state.selectedIndex];
    selectedImage.metadata = selectedImage.metadata || {};
    selectedImage.metadata.link = selectedImage.metadata.link || {};
    selectedImage.metadata.link.isValidUrl = isValid;
    this.setState({ images: this.state.images });
  };

  render() {
    const styles = this.styles;
    const { handleFileSelection, onCancel, theme, isMobile, t, anchorTarget, relValue, uiSettings } = this.props;
    const { images } = this.state;
    const selectedImage = images[this.state.selectedIndex];
    const { url, target, rel, intermediateUrl } = (!isEmpty(selectedImage.metadata.link) ? selectedImage.metadata.link : {});
    const targetBlank = target === '_blank' || isUndefined(target);
    const nofollow = rel === 'nofollow';

    /* eslint-disable jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/click-events-have-key-events */
    return (
      <FocusManager className={styles.galleryImageSettings}>
        <div className={styles.galleryImageSettings_content}>
          {isMobile ?
            <GallerySettingsMobileHeader
              theme={theme}
              cancel={() => onCancel(this.initialImageState)}
              save={() => this.onDoneClick(selectedImage)}
              saveName={this.updateLabel}
              t={t}
            /> :
            <h3
              className={classNames(styles.galleryImageSettings_backButton, styles.galleryImageSettings_title)}
              data-hook="galleryImageSettingsHeader" onClick={() => onCancel(this.initialImageState)}
            >
              <BackIcon className={styles.galleryImageSettings_backIcon} />{this.headerLabel}
            </h3>
          }
          <div
            className={classNames(styles.galleryImageSettings_scrollContainer,
              { [styles.galleryImageSettings_scrollContainer_mobile]: isMobile })}
          >
            <SettingsSection theme={theme} ariaProps={{ 'aria-label': 'image navigation', role: 'region' }}>
              <Image
                alt={selectedImage.metadata.title || 'gallery image preview'} resizeMode={'contain'}
                className={styles.galleryImageSettings_image} src={this.getImageUrl(selectedImage)} theme={theme}
              />
              <div className={classNames(styles.galleryImageSettings_nav, { [styles.galleryImageSettings_nav_mobile]: isMobile })}>
                <button
                  className={classNames(styles.galleryImageSettings_previous,
                    { [styles.galleryImageSettings_hidden]: this.state.selectedIndex === 0 })} aria-label="previous image"
                  data-hook="galleryImageSettingsPrevious" onClick={() => this.setState({ selectedIndex: this.state.selectedIndex - 1 })}
                />
                <button
                  className={classNames(styles.galleryImageSettings_next,
                    { [styles.galleryImageSettings_hidden]: this.state.selectedIndex === images.length - 1 })} aria-label="next image"
                  data-hook="galleryImageSettingsNext" onClick={() => this.setState({ selectedIndex: this.state.selectedIndex + 1 })}
                />
              </div>
            </SettingsSection>
            <div className={styles.galleryImageSettings_manageImageGrid}>
              <FileInput
                className={styles.galleryImageSettings_replace} handleFileSelection={handleFileSelection}
                dataHook="galleryImageSettingsFileInput" onChange={this.replaceItem} theme={theme} title="Replace Image"
              >
                <span className={styles.galleryImageSettings_replace_text}>{this.ReplaceLabel}</span>
              </FileInput>
              <button
                className={styles.galleryImageSettings_delete} aria-label="delete image"
                data-hook="galleryImageSettingsDeleteImage" onClick={() => this.deleteImage(selectedImage)}
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
                dataHook="galleryImageTitleInput" onChange={event => this.imageMetadataUpdated(selectedImage, { title: event.target.value })}
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
                onIntermediateUrlChange={this.onImageIntermediateUrlChange} onValidateUrl={this.onValidateUrl} uiSettings={uiSettings}
                onUrlChange={this.onImageUrlChange} onTargetBlankChange={this.onImageTargetChange} onNofollowChange={this.onImageRelChange}
              />
            </SettingsSection>

          </div>
          {isMobile ? null : <SettingsPanelFooter
            fixed
            theme={theme}
            className={styles.galleryImageSettings_footer}
            cancel={() => onCancel(this.initialImageState)}
            save={() => this.onDoneClick(selectedImage)}
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
  selectedImage: PropTypes.any.isRequired,
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
  onCancel: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
  handleFileSelection: PropTypes.func,
  handleFileChange: PropTypes.func,
  isMobile: PropTypes.bool,
  t: PropTypes.func,
  anchorTarget: PropTypes.string,
  relValue: PropTypes.string,
  uiSettings: PropTypes.object,
};

export default ImageSettings;
