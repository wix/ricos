import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import styles from '../../../statics/styles/action-buttons.scss';

const ActionButtons = ({ onCancel, onUpdate, onUpdateDataHook, cancelBtnText, updateBtnText }) => (
  <div className={styles.action_buttons}>
    <button className={styles.action_buttons_button} onClick={onCancel}>
      {cancelBtnText}
    </button>
    <button
      className={classNames(styles.action_buttons_button, styles.action_buttons_button_update)}
      data-hook={onUpdateDataHook}
      onClick={onUpdate}
    >
      {updateBtnText}
    </button>
  </div>
);

ActionButtons.propTypes = {
  onCancel: PropTypes.func,
  onUpdate: PropTypes.func,
  onUpdateDataHook: PropTypes.string,
  cancelBtnText: PropTypes.string,
  updateBtnText: PropTypes.string,
};

export default ActionButtons;
