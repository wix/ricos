import React, { useState } from 'react';
import styles from '../../statics/styles/video-settings.scss';
import {
  SettingsSection,
  LabeledToggle,
  SettingsPanelFooter,
} from 'wix-rich-content-plugin-commons';
import {
  ComponentData,
  Helpers,
  Pubsub,
  TranslationFunction,
  RichContentTheme,
} from 'wix-rich-content-common';

export interface VideoSettingsProps {
  componentData: ComponentData;
  helpers: Helpers;
  pubsub: Pubsub;
  theme: RichContentTheme;
  t: TranslationFunction;
  mobile: boolean;
}
const VideoSettings: React.FC<VideoSettingsProps> = ({
  // componentData,
  // helpers,
  // pubsub,
  theme,
  t,
  // mobile,
}) => {
  const [isDownloadEnabled, setIsDownloadEnabled] = useState(true);
  const headerText = t('VideoSettings_Header');

  // console.log('componentData', componentData);

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
          <div className={styles.videoSettingsLabel}>
            <LabeledToggle
              key={'Video can be downloaded'}
              theme={theme}
              checked={isDownloadEnabled}
              label={'label'}
              onChange={() => setIsDownloadEnabled(!isDownloadEnabled)}
            />
          </div>
        </SettingsSection>
        <SettingsPanelFooter
          fixed
          theme={theme}
          // cancel={revertComponentData}
          // save={onDoneClick}
          t={t}
        />
      </div>
    </div>
  );
};

export default VideoSettings;
