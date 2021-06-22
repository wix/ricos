import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import styles from '../../statics/styles/action-buttons.scss';

const ActionButtons = ({
  size,
  onCancel,
  onSave,
  cancelBtnText,
  saveBtnText,
  isMobile,
  dataHook,
}) => (
  <div className={classNames(styles.action_buttons, { [styles.mobile]: isMobile })}>
    <button
      className={classNames(styles.action_buttons_button, styles[size], {
        [styles.mobile]: isMobile,
      })}
      onClick={onCancel}
    >
      {cancelBtnText}
    </button>
    <button
      className={classNames(
        styles.action_buttons_button,
        styles[size],
        styles.action_buttons_button_save,
        { [styles.mobile]: isMobile }
      )}
      data-hook={dataHook}
      onClick={onSave}
    >
      {saveBtnText}
    </button>
  </div>
);

ActionButtons.propTypes = {
  onCancel: PropTypes.func,
  onSave: PropTypes.func,
  cancelBtnText: PropTypes.string,
  saveBtnText: PropTypes.string,
  dataHook: PropTypes.string,
  isMobile: PropTypes.bool,
  size: PropTypes.string,
};

export default ActionButtons;
