import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import isEmpty from 'lodash/isEmpty';
import {
  mergeStyles,
  Image,
  ImageLoader,
  InputWithLabel,
  LinkPanel,
  SettingsPanelFooter,
  SettingsSection,
} from 'wix-rich-content-common';
import getImageSrc from '../get-image-source';
import ImageSettingsMobileHeader from './image-settings-mobile-header';
import styles from '../../statics/styles/image-settings.scss';

class ImageSettings extends Component {
  constructor(props) {
    super(props);
    this.state = this.propsToState(props);
    this.initialState = { ...this.state };
    const { t, theme } = props;
    this.styles = mergeStyles({ styles, theme });

    this.updateLabel = t('ImageSettings_Update');
    this.headerText = t('ImageSettings_Header');
    this.captionLabel = t('ImageSettings_Caption_Label');
    this.captionInputPlaceholder = t('ImageSettings_Caption_Input_Placeholder');
    this.altLabel = t('ImageSettings_Alt_Label');
    this.altInputPlaceholder = t('ImageSettings_Alt_Input_Placeholder');
    this.linkLabel = t('ImageSettings_Link_Label');
  }

  propsToState(props) {
    const { componentData: { src, metadata } } = props || {};
    return {
      src,
      metadata,
    };
  }

  componentDidMount() {
    this.props.pubsub.subscribe('componentData', this.onComponentUpdate);
  }

  componentWillUnmount() {
    this.props.pubsub.unsubscribe('componentData', this.onComponentUpdate);
  }

  onComponentUpdate = () => this.forceUpdate();

  setLinkPanel = linkPanel => this.linkPanel = linkPanel;

  revertComponentData() {
    const { componentData, helpers, pubsub } = this.props;
    if (this.initialState) {
      const initialComponentData = Object.assign({}, componentData, { ...this.initialState });
      pubsub.update('componentData', initialComponentData);
      this.setState({ ...this.initialState });
    }
    helpers.closeModal();
  }

  metadataUpdated = (metadata, value) => {
    const updatedMetadata = Object.assign({}, metadata, value);
    this.setState({ metadata: updatedMetadata });
  };

  wrapBlockInLink = ({ url, targetBlank, nofollow }) => {
    const { pubsub } = this.props;
    if (!isEmpty(url)) {
      pubsub.setBlockData({ key: 'componentLink', item: { url, targetBlank, nofollow } });
    } else {
      pubsub.setBlockData({ key: 'componentLink', item: null });
    }
  };

  addMetadataToBlock = () => {
    const { pubsub, componentData } = this.props;
    const { alt, caption } = this.state.metadata || {};
    const metadata = {
      alt: alt || undefined,
      caption: caption || undefined,
    };
    pubsub.set('componentData', {
      ...componentData,
      metadata,
    });
  };

  deleteLink = () => {
    this.props.pubsub.setBlockData({ key: 'componentLink', item: null });
  }

  onDoneClick = () => {
    const { helpers } = this.props;
    if (this.linkPanel.state.isValidUrl && this.linkPanel.state.url) {
      const { url, targetBlank, nofollow } = this.linkPanel.state;
      this.wrapBlockInLink({ url, targetBlank, nofollow });
    } else if (this.linkPanel.state.intermediateUrl === '') {
      this.deleteLink();
    }
    if (this.state.metadata) {
      this.addMetadataToBlock();
    }
    helpers.closeModal();
  };

  render() {
    const { componentData, helpers, theme, t, anchorTarget, relValue, isMobile, uiSettings } = this.props;
    const { config = {} } = componentData;
    const { src, metadata = {} } = this.state;

    if (!src) {
      return <ImageLoader type={'medium'} theme={theme} />; //do not render until the src is passed
    }

    const { url, target, rel } = (!isEmpty(config.link) ? config.link : {});
    const targetBlank = target === '_blank';
    const nofollow = rel === 'nofollow';


    return (
      <div className={this.styles.imageSettings} data-hook="imageSettings">

        {isMobile ?
          <ImageSettingsMobileHeader
            t={t}
            theme={theme}
            cancel={() => this.revertComponentData()}
            save={() => this.onDoneClick()}
            saveName={this.updateLabel}
          /> :
          <h3 className={this.styles.imageSettingsTitle}>{this.headerText}</h3>
        }
        <div className={classNames(styles.imageSettings_scrollContainer, { [styles.imageSettings_mobile]: isMobile })}>
          <SettingsSection theme={theme} ariaProps={{ 'aria-label': 'image preview', role: 'region' }}>
            <Image
              alt={metadata.alt || 'image preview'} resizeMode={'contain'} className={this.styles.imageSettingsImage}
              src={getImageSrc(src, helpers, { requiredWidth: 1000, requiredHeight: 250, requiredQuality: 80 })} theme={theme}
            />
          </SettingsSection>
          <SettingsSection theme={theme} className={this.styles.imageSettingsSection} ariaProps={{ 'aria-label': 'image caption', role: 'region' }}>
            <InputWithLabel
              theme={theme}
              id="imageSettingsCaptionInput"
              label={this.captionLabel}
              placeholder={this.captionInputPlaceholder}
              value={metadata.caption || ''}
              onChange={event => this.metadataUpdated(metadata, { caption: event.target.value })}
              dataHook="imageSettingsCaptionInput"
            />
          </SettingsSection>
          <SettingsSection theme={theme} className={this.styles.imageSettingsSection} ariaProps={{ 'aria-label': 'image alt text', role: 'region' }}>
            <InputWithLabel
              theme={theme}
              id="imageSettingsAltInput"
              label={this.altLabel}
              placeholder={this.altInputPlaceholder}
              value={metadata.alt || ''}
              onChange={event => this.metadataUpdated(metadata, { alt: event.target.value })}
              dataHook="imageSettingsAltInput"
            />
          </SettingsSection>
          <SettingsSection theme={theme} className={this.styles.imageSettingsSection} ariaProps={{ 'aria-label': 'image link', role: 'region' }}>
            <span id="image_settings_link_lbl" className={this.styles.inputWithLabel_label}>{this.linkLabel}</span>
            <LinkPanel
              ref={this.setLinkPanel} theme={theme} url={url} targetBlank={targetBlank} nofollow={nofollow} uiSettings={uiSettings}
              isImageSettings anchorTarget={anchorTarget} relValue={relValue} t={t} ariaProps={{ 'aria-labelledby': 'image_settings_link_lbl' }}
            />
          </SettingsSection>
        </div>
        {isMobile ? null : <SettingsPanelFooter
          fixed
          theme={theme}
          cancel={() => this.revertComponentData()}
          save={() => this.onDoneClick()}
          t={t}
        />
        }

      </div>
    );
  }
}
ImageSettings.propTypes = {
  componentData: PropTypes.any.isRequired,
  helpers: PropTypes.object,
  theme: PropTypes.object.isRequired,
  pubsub: PropTypes.any,
  t: PropTypes.func,
  anchorTarget: PropTypes.string,
  relValue: PropTypes.string,
  isMobile: PropTypes.bool,
  uiSettings: PropTypes.object,
};

export default ImageSettings;
