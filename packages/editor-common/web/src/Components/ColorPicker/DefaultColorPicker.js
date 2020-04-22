import React from 'react';
import PropTypes from 'prop-types';
import CustomColorPickerDialog from './CustomColorPickerDialog';

const DefaultColorPicker = ({
  color,
  onCustomColorPicked,
  onCustomColorCancel,
  onCustomColorUpdate,
  ...props
}) => (
  <CustomColorPickerDialog
    color={color}
    onChange={onCustomColorPicked}
    onUpdate={onCustomColorUpdate}
    onCancel={onCustomColorCancel}
    {...props}
  />
);

DefaultColorPicker.propTypes = {
  color: PropTypes.string.isRequired,
  onCustomColorPicked: PropTypes.func,
  onCustomColorCancel: PropTypes.func,
  onCustomColorUpdate: PropTypes.func,
  t: PropTypes.func,
  isMobile: PropTypes.bool,
  theme: PropTypes.object.isRequired,
};

export default DefaultColorPicker;
