import React, { FunctionComponent, MouseEventHandler } from 'react';
import styles from './ActionButton.scss';
import Tooltip from 'wix-rich-content-common/libs/Tooltip';

interface Props {
  text: string;
  tooltipText?: string;
  onClick: MouseEventHandler;
  isDisabled?: boolean;
}

const ActionButton: FunctionComponent<Props> = ({
  text,
  tooltipText = '',
  onClick,
  isDisabled,
}) => (
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

export default ActionButton;
