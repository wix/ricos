import React from 'react';
import classNames from 'classnames';
import Button from './Button';
import { RichContentTheme } from 'wix-rich-content-common';
import styles from '../../statics/styles/action-buttons.scss';

type sizeType = 'xs' | 'sm' | 'md' | 'lg';
export interface ActionButtonsProps {
  size: sizeType;
  onCancel: () => void;
  onSave: () => void;
  cancelText: string;
  saveText: string;
  isMobile?: boolean;
  saveBtnDataHook?: string;
  cancelBtnDataHook?: string;
  theme?: RichContentTheme;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  size = 'sm',
  onCancel,
  onSave,
  cancelText,
  saveText,
  isMobile,
  saveBtnDataHook,
  cancelBtnDataHook,
  theme,
}) => (
  <div className={classNames(styles.action_buttons, { [styles.mobile]: isMobile })}>
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
      ariaProps={{ 'aria-label': saveText }}
      theme={theme}
      className={classNames(
        styles.action_buttons_button,
        styles[size],
        styles.action_buttons_button_save,
        { [styles.mobile]: isMobile }
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
