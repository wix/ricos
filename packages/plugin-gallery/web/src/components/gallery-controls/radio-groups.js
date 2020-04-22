import React from 'react';
import PropTypes from 'prop-types';
import { RadioGroupHorizontal } from 'wix-rich-content-editor-common';

const propTypes = {
  onChange: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
  value: PropTypes.string.isRequired,
  options: PropTypes.object,
  t: PropTypes.func,
};

export const ThumbnailResize = props => {
  const { t } = props;
  const thumbnailResizeLabel = t('GallerySettings_Radios_Thumbnail_Resize');
  const cropLabel = t('GallerySettings_Radios_Crop');
  const fitLabel = t('GallerySettings_Radios_Fit');

  return (
    <RadioGroupHorizontal
      label={thumbnailResizeLabel}
      dataSource={[
        { value: 'fill', labelText: cropLabel, dataHook: 'radioGroupFill' },
        { value: 'fit', labelText: fitLabel, dataHook: 'radioGroupFit' },
      ]}
      {...props}
    />
  );
};
ThumbnailResize.propTypes = propTypes;

export const TitleButtonPlacement = props => {
  const { t } = props;
  const titleButtonPlacementLabel = t('GallerySettings_Radios_Title_Button_Placement');
  const underneathLabel = t('GallerySettings_Radios_Underneath');
  const onHoverLabel = t('GallerySettings_Radios_On_Hover');

  return (
    <RadioGroupHorizontal
      label={titleButtonPlacementLabel}
      dataSource={[
        { value: 'SHOW_ALWAYS', labelText: underneathLabel, dataHook: 'radioGroupTitleShowAlways' },
        { value: 'SHOW_ON_HOVER', labelText: onHoverLabel, dataHook: 'radioGroupTitleShowOnHover' },
      ]}
      {...props}
    />
  );
};
TitleButtonPlacement.propTypes = propTypes;

export const ImageOrientation = props => {
  const { t } = props;
  const imageOrientationLabel = t('GallerySettings_Radios_Image_Orientation');
  const verticalLabel = t('GallerySettings_Radios_Vertical');
  const horizontalLabel = t('GallerySettings_Radios_Horizontal');

  return (
    <RadioGroupHorizontal
      label={imageOrientationLabel}
      dataSource={[
        { value: '1', labelText: verticalLabel, dataHook: 'radioGroupImageOrientationVertical' },
        {
          value: '0',
          labelText: horizontalLabel,
          dataHook: 'radioGroupImageOrientationHorizontal',
        },
      ]}
      {...props}
    />
  );
};
ImageOrientation.propTypes = propTypes;

export const ScrollDirection = props => {
  const { t } = props;
  const scrollDirectionLabel = t('GallerySettings_Radios_Scroll_Direction');
  const verticalLabel = t('GallerySettings_Radios_Vertical');
  const horizontalLabel = t('GallerySettings_Radios_Horizontal');

  return (
    <RadioGroupHorizontal
      label={scrollDirectionLabel}
      dataSource={[
        {
          value: 'vertical',
          labelText: verticalLabel,
          dataHook: 'radioGroupScrollDirectionVertical',
        },
        {
          value: 'horizontal',
          labelText: horizontalLabel,
          dataHook: 'radioGroupScrollDirectionHorizontal',
        },
      ]}
      {...props}
    />
  );
};
ScrollDirection.propTypes = propTypes;
