import React from 'react';
import PropTypes from 'prop-types';
import { SettingsMobileHeader } from 'wix-rich-content-plugin-commons';

const GallerySettingsMobileHeader = ({
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
    dataHookPrefix: 'gallerySettingsMobileHeader',
    cancelLabel: cancelName || t('GallerySettings_MobileHeader_Cancel'),
    saveLabel: saveName || t('GallerySettings_MobileHeader_Save'),
  };

  return <SettingsMobileHeader {...props} />;
};

GallerySettingsMobileHeader.propTypes = {
  save: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
  cancel: PropTypes.func.isRequired,
  switchTab: PropTypes.func,
  otherTab: PropTypes.string,
  saveName: PropTypes.string,
  cancelName: PropTypes.string,
  t: PropTypes.func,
};

export default GallerySettingsMobileHeader;
