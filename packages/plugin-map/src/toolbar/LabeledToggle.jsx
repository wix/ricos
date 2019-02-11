import React from 'react';
import PropTypes from 'prop-types';
import styles from '../../statics/styles/map-settings-modal.scss';
import classNames from 'classnames';

export const LabeledToggle = ({ label, onChange, checked, sliderColor, toggleIsOnTrackColor, toggleIsOffTrackColor }) => {
  return (
    <div className={styles.labeled_toggle_root}>
      <div
        role="button"
        tabIndex="0"
        onClick={onChange}
        onKeyPress={e => e.key === 'Enter' ? onChange() : undefined}
        className={styles.labeled_toggle_label_wrapper}
      >
        <p className={styles.labeled_toggle_label}>{label}</p>
      </div>
      <div className={styles.labeled_toggle_input_root}>
        <div className={classNames(styles.labeled_toggle_input_container, { off: !checked })} >
          <input
            type="checkbox"
            className={styles.labeled_toggle_checkbox_input}
            onChange={onChange}
            checked={checked}
            tabIndex={-1}
          />
          <div className={styles.labeled_toggle_switch}>
            <span
              className={styles.labeled_toggle_track}
              style={{
                background: checked ? toggleIsOnTrackColor : toggleIsOffTrackColor
              }}
            />
            <span
              className={styles.labeled_toggle_slider}
              style={{
                transform: checked ? 'translateX(22px)' : 'translateX(2px)',
                background: sliderColor,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

LabeledToggle.propTypes = {
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  checked: PropTypes.bool.isRequired,
  sliderColor: PropTypes.string.isRequired,
  toggleIsOffTrackColor: PropTypes.string.isRequired,
  toggleIsOnTrackColor: PropTypes.string.isRequired,
};

