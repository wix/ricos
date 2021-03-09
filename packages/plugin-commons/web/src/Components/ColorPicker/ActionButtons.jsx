import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import styles from '../../../statics/styles/custom-color-picker-dialog.scss';

const ActionButtons = ({ t, onCancel, onUpdate }) => (
  <div className={styles.colorPickerDialog_buttons}>
    <button className={styles.colorPickerDialog_button} onClick={onCancel}>
      {t('ColorPickerButtonLabel_Cancel')}
    </button>
    <button
      className={classNames(
        styles.colorPickerDialog_button,
        styles.colorPickerDialog_button_update
      )}
      data-hook="colorPickerUpdateButton"
      onClick={onUpdate}
    >
      {t('ColorPickerButtonLabel_Update')}
    </button>
  </div>
);

ActionButtons.propTypes = {
  t: PropTypes.func,
  onCancel: PropTypes.func,
  onUpdate: PropTypes.func,
};
export default ActionButtons;
