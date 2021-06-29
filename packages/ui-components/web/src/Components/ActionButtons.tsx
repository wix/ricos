import React from 'react';
import classNames from 'classnames';
import Button from './Button';
import { RichContentTheme } from 'wix-rich-content-common';
import styles from '../../statics/styles/action-buttons.scss';
import { BUTTON_SIZE } from '../consts';

type ButtonSizeKeys = keyof typeof BUTTON_SIZE;
export interface ActionButtonsProps {
  size?: typeof BUTTON_SIZE[ButtonSizeKeys];
  onCancel: () => void;
  onSave: () => void;
  cancelText: string;
  saveText: string;
  isMobile?: boolean;
  saveBtnDataHook?: string;
  cancelBtnDataHook?: string;
  selected?: boolean;
  theme?: RichContentTheme;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  size = BUTTON_SIZE.small,
  onCancel,
  onSave,
  cancelText,
  saveText,
  isMobile = false,
  saveBtnDataHook,
  cancelBtnDataHook,
  theme,
  selected = true,
}) => (
  <div className={classNames(styles.action_buttons, styles[size], { [styles.mobile]: isMobile })}>
    <Button
      theme={theme}
      ariaProps={{ 'aria-label': cancelText }}
      dataHook={cancelBtnDataHook}
      onClick={onCancel}
      className={classNames(styles.action_buttons_button, styles[size], {
        [styles.mobile]: isMobile,
      })}
      type={'secondary'}
    >
      {cancelText}
    </Button>
    <Button
      ariaProps={{ 'aria-label': saveText } && !selected && { disabled: 'disabled' }}
      theme={theme}
      className={classNames(
        styles.action_buttons_button,
        styles[size],
        styles.action_buttons_button_save,
        { [styles.mobile]: isMobile },
        { [styles.disabled]: !selected }
      )}
      dataHook={saveBtnDataHook}
      onClick={onSave}
      type={'primary'}
    >
      {saveText}
    </Button>
  </div>
);

export default ActionButtons;
