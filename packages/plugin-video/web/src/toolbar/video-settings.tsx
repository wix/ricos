import React, { useState } from 'react';
import { VideoSettingsProps } from '../types';
import { InfoIcon } from 'wix-rich-content-editor-common';
import classNames from 'classnames';
import { mergeStyles } from 'wix-rich-content-common';
import Styles from '../../statics/styles/video-settings.scss';
import {
  SettingsSection,
  LabeledToggle,
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
  const disableDownload = settings.disableDownload || componentData?.config?.disableDownload;
  const [isDownloadEnabled, setIsDownloadEnabled] = useState(!disableDownload);
  const styles = mergeStyles({ styles: Styles, theme });

  const onToggle = () => setIsDownloadEnabled(!isDownloadEnabled);
  const onCancelClick = () => helpers.closeModal?.();
  const onDoneClick = () => {
    const newComponentData = { ...componentData, config: { disableDownload: !isDownloadEnabled } };
    pubsub.update('componentData', newComponentData);
    helpers.closeModal?.();
  };

  const mobileSettingsProps = {
    t,
    theme,
    dataHookPrefix: 'VideoSettingsMobileHeader',
    cancelLabel: t('SettingsPanelFooter_Cancel'),
    saveLabel: t('SettingsPanelFooter_Save'),
    isSettingsModal: true,
    cancel: onCancelClick,
    save: onDoneClick,
  };

  return (
    <div
      className={classNames(styles.videoSettings, {
        [styles.videoSettings_mobile]: isMobile,
      })}
    >
      {isMobile ? (
        <SettingsMobileHeader {...mobileSettingsProps} />
      ) : (
        <React.Fragment>
          <div className={styles.videoSettingsTitle}>{t('VideoSettings_Header')}</div>
          <div className={styles.separator} />
        </React.Fragment>
      )}
      <SettingsSection theme={theme} className={classNames(styles.videoSettings_toggleContainer)}>
        <LabeledToggle
          theme={theme}
          checked={isDownloadEnabled}
          label={t('VideoSettings_Video_CanBeDownloaded_Label')}
          onChange={onToggle}
        />
        <InfoIcon
          theme={theme}
          isNotification
          tooltipText={t('VideoSettings_Video_CanBeDownloaded_Tooltip')}
        />
      </SettingsSection>
      {!isMobile && (
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
