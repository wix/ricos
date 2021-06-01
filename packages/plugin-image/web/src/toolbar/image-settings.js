import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { mergeStyles, getImageSrc } from 'wix-rich-content-common';
import { LabeledToggle } from 'wix-rich-content-ui-components';
import {
  Image,
  InputWithLabel,
  SettingsPanelFooter,
  SettingsSection,
  Loader,
} from 'wix-rich-content-plugin-commons';
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
    this.altTooltip = 'ImageSettings_Alt_Label_Tooltip';
    this.altInputPlaceholder = t('ImageSettings_Alt_Input_Placeholder');
  }

  propsToState(props) {
    const { componentData } = props;
    const { src, metadata, error, disableExpand, disableDownload } = componentData;
    const isExpandEnabled = !disableExpand;
    const isDownloadEnabled = !disableDownload;

    return {
      src,
      metadata,
      error,
      isExpandEnabled,
      isDownloadEnabled,
    };
  }

  toggleState = key => () => {
    this.setState(prevState => ({
      [key]: !prevState[key],
    }));
  };

  renderToggle = ({ toggleKey, labelKey, dataHook, tooltipText }) => {
    return (
      <div key={toggleKey} className={this.styles.imageSettings_toggleContainer}>
        <LabeledToggle
          theme={this.props.theme}
          checked={this.state[toggleKey]}
          label={this.props.t(labelKey)}
          onChange={this.toggleState(toggleKey)}
          dataHook={dataHook}
          tooltipText={tooltipText}
        />
      </div>
    );
  };

  toggleData = [
    {
      toggleKey: 'isExpandEnabled',
      labelKey: 'ImagePlugin_Settings_ImageOpensInExpandMode_Label',
      dataHook: 'imageExpandToggle',
    },
    {
      toggleKey: 'isDownloadEnabled',
      labelKey: 'ImagePlugin_Settings_ImageCanBeDownloaded_Label',
      dataHook: 'imageDownloadToggle',
      tooltipText: this.props.t('ImagePlugin_Settings_ImageCanBeDownloaded_Tooltip'),
    },
  ];

  componentDidMount() {
    this.props.pubsub.subscribe('componentData', this.onComponentUpdate);
  }

  componentWillUnmount() {
    this.props.pubsub.unsubscribe('componentData', this.onComponentUpdate);
  }

  onComponentUpdate = () => {
    const componentData = this.props.pubsub.get('componentData');
    this.setState({ src: componentData.src, error: componentData?.error });
  };

  revertComponentData() {
    const { componentData, helpers, pubsub } = this.props;
    if (this.initialState) {
      const initialComponentData = { ...componentData, ...this.initialState };
      pubsub.update('componentData', initialComponentData);
      this.setState({ ...this.initialState });
    }
    helpers.closeModal();
  }

  metadataUpdated = (metadata, value) => {
    this.setState({ metadata: { ...metadata, ...value } });
  };

  onDoneClick = () => {
    const { helpers, componentData, pubsub } = this.props;
    const newComponentData = {
      ...componentData,
      disableDownload: !this.state.isDownloadEnabled,
      disableExpand: !this.state.isExpandEnabled,
    };
    if (this.state.metadata) {
      newComponentData.metadata = this.state.metadata;
    }
    pubsub.update('componentData', newComponentData);

    helpers.closeModal();
  };

  setBlockLink = item => this.props.pubsub.setBlockData({ key: 'componentLink', item });

  render() {
    const { helpers, theme, t, isMobile, languageDir } = this.props;
    const { src, error, metadata = {} } = this.state;
    return (
      <div className={this.styles.imageSettings} data-hook="settings" dir={languageDir}>
        {isMobile ? (
          <ImageSettingsMobileHeader
            t={t}
            theme={theme}
            cancel={() => this.revertComponentData()}
            save={() => this.onDoneClick()}
            saveName={this.updateLabel}
          />
        ) : (
          <h3 className={this.styles.imageSettingsTitle}>{this.headerText}</h3>
        )}
        <div
          className={classNames(styles.imageSettings_scrollContainer, {
            [styles.imageSettings_mobile]: isMobile,
          })}
        >
          <SettingsSection
            theme={theme}
            className={this.styles.imageSettingsImageSection}
            ariaProps={{
              'aria-label': 'image preview',
              role: 'region',
              'data-hook': 'imagePreview',
            }}
          >
            {src ? (
              <Image
                alt={metadata.alt || 'image preview'}
                resizeMode={'contain'}
                className={this.styles.imageSettingsImage}
                src={getImageSrc(src, helpers?.getImageUrl, {
                  requiredWidth: 1000,
                  requiredHeight: 250,
                  requiredQuality: 80,
                })}
                theme={theme}
                error={error}
                t={t}
              />
            ) : (
              <div className={this.styles.imageSettingsImage}>
                <Loader type={'medium'} />
              </div>
            )}
          </SettingsSection>
          <div className={this.styles.imageSettings_inputsWrapper}>
            <SettingsSection
              theme={theme}
              className={this.styles.imageSettingsSection}
              ariaProps={{ 'aria-label': 'image caption', role: 'region' }}
            >
              <InputWithLabel
                theme={theme}
                id="imageSettingsCaptionInput"
                label={this.captionLabel}
                placeholder={this.captionInputPlaceholder}
                value={metadata.caption || ''}
                onChange={caption => this.metadataUpdated(metadata, { caption })}
                dataHook="imageSettingsCaptionInput"
              />
            </SettingsSection>
            <SettingsSection
              theme={theme}
              className={this.styles.imageSettingsSection}
              ariaProps={{ 'aria-label': 'image alt text', role: 'region' }}
            >
              <InputWithLabel
                theme={theme}
                id="imageSettingsAltInput"
                label={this.altLabel}
                placeholder={this.altInputPlaceholder}
                t={t}
                value={metadata.alt || ''}
                onChange={alt => this.metadataUpdated(metadata, { alt })}
                dataHook="imageSettingsAltInput"
                tooltipTextKey={this.altTooltip}
                isMobile={isMobile}
              />
            </SettingsSection>
            <SettingsSection
              theme={theme}
              ariaProps={{ 'aria-label': 'link redirect explanation', role: 'region' }}
            >
              <div className={this.styles.imageSettingsLabel}>
                {this.toggleData.map(toggle => this.renderToggle(toggle))}
              </div>
            </SettingsSection>
          </div>
        </div>
        {!isMobile && (
          <SettingsPanelFooter
            fixed
            theme={theme}
            cancel={() => this.revertComponentData()}
            save={() => this.onDoneClick()}
            t={t}
          />
        )}
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
  isMobile: PropTypes.bool,
  languageDir: PropTypes.string,
};

export default ImageSettings;
