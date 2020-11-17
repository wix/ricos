import React from 'react';
import styles from './ActionButton.scss';
import Tooltip from 'wix-rich-content-common/Tooltip';
import PropTypes from 'prop-types';

const ActionButton = ({ text, tooltipText = '', onClick, isDisabled }) => (
  <Tooltip content={tooltipText}>
    <div className={styles.buttonWrapper}>
      <button
        className={styles.publishButton}
        type="button"
        onClick={onClick}
        disabled={isDisabled}
      >
        {text}
      </button>
    </div>
  </Tooltip>
);

ActionButton.propTypes = {
  text: PropTypes.string.isRequired,
  tooltipText: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool,
};

export default ActionButton;
