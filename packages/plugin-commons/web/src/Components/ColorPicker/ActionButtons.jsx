import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import styles from '../../../statics/styles/action-buttons.scss';

const ActionButtons = ({ onCancel, onUpdate, cancelBtnText, updateBtnText, isMobile }) => (
  <div className={classNames(styles.action_buttons, { [styles.mobile]: isMobile })}>
    <button className={styles.action_buttons_button} onClick={onCancel}>
      {cancelBtnText}
    </button>
    <button
      className={classNames(styles.action_buttons_button, styles.action_buttons_button_update)}
      data-hook={'colorPickerUpdateButton'}
      onClick={onUpdate}
    >
      {updateBtnText}
    </button>
  </div>
);

ActionButtons.propTypes = {
  onCancel: PropTypes.func,
  onUpdate: PropTypes.func,
  cancelBtnText: PropTypes.string,
  updateBtnText: PropTypes.string,
  isMobile: PropTypes.bool,
};

export default ActionButtons;
