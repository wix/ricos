import React from 'react';
import PropTypes from 'prop-types';
import { Tooltip } from 'wix-rich-content-common';
import { EmojiPluginIcon } from './icons';

const SelectButton = ({ t, theme }) => {
  return (
    <Tooltip
      content={t('EmojiPlugin_InsertButton_Tooltip')}
      moveBy={{ x: 5, y: 0 }}
      theme={theme}
    >
      <div>
        <EmojiPluginIcon/>
      </div>
    </Tooltip>
  );
};

SelectButton.propTypes = {
  t: PropTypes.func,
  theme: PropTypes.object,
};

export default SelectButton;
