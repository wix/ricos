import React from 'react';
import PropTypes from 'prop-types';
import { SettingsMobileHeader } from 'wix-rich-content-plugin-commons';

const ImageSettingsMobileHeader = ({
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
    dataHookPrefix: 'ImageSettingsMobileHeader',
    cancelLabel: cancelName || t('ImageSettings_MobileHeader_Cancel'),
    saveLabel: saveName || t('ImageSettings_MobileHeader_Save'),
  };

  return <SettingsMobileHeader {...props} />;
};

ImageSettingsMobileHeader.propTypes = {
  save: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
  cancel: PropTypes.func.isRequired,
  switchTab: PropTypes.func,
  otherTab: PropTypes.string,
  saveName: PropTypes.string,
  cancelName: PropTypes.string,
  t: PropTypes.func,
};

export default ImageSettingsMobileHeader;
