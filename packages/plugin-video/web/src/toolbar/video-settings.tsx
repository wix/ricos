import React, { useState } from 'react';
import { VideoSettingsProps } from '../types';
import { NotificationIcon } from 'wix-rich-content-editor-common';
import VideoSettingsMobileHeader from './video-settings-mobile-header';
import classNames from 'classnames';
import { mergeStyles } from 'wix-rich-content-common';
import Styles from '../../statics/styles/video-settings.scss';
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
  settings,
}) => {
  const disableDownload = settings.disableDownload || componentData?.config?.disableDownload;
  const [isDownloadEnabled, setIsDownloadEnabled] = useState(!disableDownload);
  const headerText = t('VideoSettings_Header');
  const videoCanBeDownloadedLabel = t('VideoSettings_Video_CanBeDownloaded_Label');
  const videoCanBeDownloadedTooltipText = t('VideoSettings_Video_CanBeDownloaded_Tooltip');
  const styles = mergeStyles({ styles: Styles, theme });

  const onDoneClick = () => {
    const newComponentData = { ...componentData, config: { disableDownload: !isDownloadEnabled } };
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
      {isMobile ? (
        <VideoSettingsMobileHeader t={t} theme={theme} cancel={onCancelClick} save={onDoneClick} />
      ) : (
        <>
          <h3 className={styles.videoSettingsTitle}>{headerText}</h3>
          <hr />
        </>
      )}
      <div
        className={classNames(styles.videoSettings_scrollContainer, {
          [styles.videoSettings_mobile]: isMobile,
        })}
      >
        <SettingsSection
          theme={theme}
          className={styles.videoSettingsSection}
          ariaProps={{ 'aria-label': 'link redirect explanation', role: 'region' }}
        >
          <div className={styles.videoSettings_toggleContainer}>
            <LabeledToggle
              style={{ paddingTop: 24 }}
              theme={theme}
              checked={isDownloadEnabled}
              label={videoCanBeDownloadedLabel}
              onChange={() => setIsDownloadEnabled(!isDownloadEnabled)}
            />
            <NotificationIcon theme={theme} tooltipText={videoCanBeDownloadedTooltipText} />
          </div>
        </SettingsSection>
      </div>
      {isMobile ? null : (
        <SettingsPanelFooter
          className={styles.videoSettings_footer}
          fixed
          theme={theme}
          cancel={onCancelClick}
          save={onDoneClick}
          t={t}
        />
      )}
    </div>
  );
};

export default VideoSettings;
