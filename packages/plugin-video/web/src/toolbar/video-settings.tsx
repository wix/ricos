import React, { useState } from 'react';
import styles from '../../statics/styles/video-settings.scss';
import { VideoSettingsProps } from '../types';
import NotificationIcon from '../icons/NotificationIcon';
import {
  SettingsSection,
  LabeledToggle,
  SettingsPanelFooter,
} from 'wix-rich-content-plugin-commons';

const VideoSettings: React.FC<VideoSettingsProps> = ({
  componentData,
  helpers,
  pubsub,
  theme,
  t,
  isMobile,
}) => {
  const { configViewer } = componentData;
  const [isDownloadEnabled, setIsDownloadEnabled] = useState(configViewer.isDownloadEnabled);
  const headerText = t('VideoSettings_Header');
  const canBeDownloadedLabel = t('VideoSettings_Video_CanBeDownloaded_Label');

  const onDoneClick = () => {
    const newComponentData = { ...componentData, configViewer: { isDownloadEnabled } };
    pubsub.update('componentData', newComponentData);
    if (helpers.closeModal) {
      helpers.closeModal();
    }
  };

  const onCancelClick = () => {
    if (helpers.closeModal) {
      helpers.closeModal();
    }
  };

  return (
    <div className={styles.videoSettings}>
      <h3 className={styles.videoSettingsTitle}>{headerText}</h3>
      <div className={styles.videoSettings_scrollContainer}>
        <hr />
        <SettingsSection
          theme={theme}
          className={styles.videoSettingsSection}
          ariaProps={{ 'aria-label': 'link redirect explanation', role: 'region' }}
        >
          <div className={styles.videoSettings_toggleContainer}>
            <LabeledToggle
              className={styles.videoSettings_toggle}
              theme={theme}
              checked={isDownloadEnabled}
              label={canBeDownloadedLabel}
              onChange={() => setIsDownloadEnabled(!isDownloadEnabled)}
            />
            <NotificationIcon />
          </div>
        </SettingsSection>
        {isMobile ? null : (
          <SettingsPanelFooter
            fixed
            theme={theme}
            cancel={onCancelClick}
            save={onDoneClick}
            t={t}
          />
        )}
      </div>
    </div>
  );
};

export default VideoSettings;
