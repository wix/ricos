import React, { useState } from 'react';
import { VideoSettingsProps } from '../types';
import classNames from 'classnames';
import { mergeStyles } from 'wix-rich-content-common';
import Styles from '../../statics/styles/video-settings.scss';
import { LabeledToggle } from 'wix-rich-content-ui-components';
import {
  SettingsSection,
  SettingsPanelFooter,
  SettingsMobileHeader,
} from 'wix-rich-content-plugin-commons';

const VideoSettings: React.FC<VideoSettingsProps> = ({
  componentData,
  helpers,
  pubsub,
  theme,
  t,
  isMobile,
  settings,
}) => {
  const disableDownload =
    componentData.disableDownload !== undefined
      ? componentData.disableDownload
      : !!settings.disableDownload;
  const isSpoilered = componentData.config?.spoiler?.enabled;

  const [isDownloadEnabled, setIsDownloadEnabled] = useState(!disableDownload);
  const [isSpoilerEnabled, setIsSpoilerEnabled] = useState(isSpoilered);
  const styles = mergeStyles({ styles: Styles, theme });
  const closeModal = () => helpers.closeModal?.();
  const getSpoilerConfig = enabled => ({
    config: { ...componentData.config, spoiler: { enabled } },
  });
  const onDoneClick = () => {
    const newComponentData = {
      ...componentData,
      disableDownload: !isDownloadEnabled,
      ...getSpoilerConfig(isSpoilerEnabled),
    };
    pubsub.update('componentData', newComponentData);
    closeModal();
  };
  const isCustomVideo = !!componentData.isCustomVideo;
  const mobileSettingsProps = {
    t,
    theme,
    dataHookPrefix: 'VideoSettingsMobileHeader',
    cancelLabel: t('SettingsPanelFooter_Cancel'),
    saveLabel: t('SettingsPanelFooter_Save'),
    isMediaSettingsModal: true,
    cancel: closeModal,
    save: onDoneClick,
  };

  const spoilerToggle = {
    toggleKey: 'isSpoilerEnabled',
    labelKey: 'VideoSettings_Spoiler_Toggle',
    dataHook: 'videoSpoilerToggle',
    tooltipText: 'Spoiler_Toggle_Tooltip',
    checked: isSpoilerEnabled,
    onToggle: () => {
      const value = !isSpoilerEnabled;
      setIsSpoilerEnabled(value);
      pubsub.update('componentData', { ...componentData, ...getSpoilerConfig(value) });
    },
  };
  const downloadToggle = {
    toggleKey: 'isDownloadEnabled',
    labelKey: 'VideoPlugin_Settings_VideoCanBeDownloaded_Label',
    dataHook: 'videoDownloadToggle',
    tooltipText: 'VideoPlugin_Settings_VideoCanBeDownloaded_Tooltip',
    checked: isDownloadEnabled,
    onToggle: () => setIsDownloadEnabled(!isDownloadEnabled),
  };

  const toggleData = isCustomVideo ? [downloadToggle, spoilerToggle] : [spoilerToggle];

  return (
    <div
      data-hook="settings"
      className={classNames(styles.videoSettings, {
        [styles.videoSettings_mobile]: isMobile,
      })}
    >
      {isMobile ? (
        <SettingsMobileHeader {...mobileSettingsProps} />
      ) : (
        <>
          <div className={styles.videoSettingsTitle}>{t('VideoPlugin_Settings_Header')}</div>
          <div className={styles.separator} />
        </>
      )}
      <SettingsSection theme={theme} className={classNames(styles.videoSettings_toggleContainer)}>
        {toggleData.map(({ toggleKey, labelKey, tooltipText, dataHook, onToggle, checked }) => (
          <LabeledToggle
            key={toggleKey}
            theme={theme}
            checked={checked}
            label={t(labelKey)}
            onChange={onToggle}
            tooltipText={t(tooltipText)}
            dataHook={dataHook}
          />
        ))}
      </SettingsSection>
      {!isMobile && (
        <SettingsPanelFooter
          className={styles.videoSettings_footer}
          fixed
          theme={theme}
          cancel={closeModal}
          save={onDoneClick}
          t={t}
        />
      )}
    </div>
  );
};

export default VideoSettings;
