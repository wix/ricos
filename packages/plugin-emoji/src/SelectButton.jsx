import React from 'react';
import PropTypes from 'prop-types';
import { Tooltip, mergeStyles } from 'wix-rich-content-common';
import { EmojiPluginIcon } from './icons';
import styles from '../statics/SelectButton.scss';

// TODO: convert all the inline styles to CSS to be themable
const SelectButton = ({ t, theme }) => {
  const mergedStyles = mergeStyles({ styles, theme });
  return (
    <Tooltip content={t('EmojiPlugin_InsertButton_Tooltip')} theme={theme}>
      <div className={mergedStyles.emoji_selectButton}>
        <span className={mergedStyles.emoji_selectButton_icon}><EmojiPluginIcon /></span>
      </div>
    </Tooltip>
  );
};

SelectButton.propTypes = {
  t: PropTypes.func,
  theme: PropTypes.object,
};

export default SelectButton;
