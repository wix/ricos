import React from 'react';
import PropTypes from 'prop-types';
import { MediaSettingsMobileHeader } from 'wix-rich-content-plugin-commons';

const VideoSettingsMobileHeader = ({
  theme,
  saveName,
  cancelName,
  t,
  save,
  cancel,
  switchTab,
  otherTab,
}) => {
  const props = {
    theme,
    save,
    cancel,
    switchTab,
    otherTab,
    dataHookPrefix: 'VideoSettingsMobileHeader',
    cancelLabel: cancelName || t('VideoSettings_MobileHeader_Cancel'),
    saveLabel: saveName || t('VideoSettings_MobileHeader_Save'),
  };

  return <MediaSettingsMobileHeader {...props} />;
};

VideoSettingsMobileHeader.propTypes = {
  save: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
  cancel: PropTypes.func.isRequired,
  switchTab: PropTypes.func,
  otherTab: PropTypes.string,
  saveName: PropTypes.string,
  cancelName: PropTypes.string,
  t: PropTypes.func,
};

export default VideoSettingsMobileHeader;
