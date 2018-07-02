import React from 'react';
import PropTypes from 'prop-types';
import { Tooltip } from 'wix-rich-content-common';
import { EmojiPluginIcon } from './icons';

const SelectButton = ({ t, theme }) => {
  return (
    <Tooltip content={t('EmojiPlugin_InsertButton_Tooltip')} moveBy={{ x: 5, y: -5 }} theme={theme}>
      <div
        style={{
          width: '19px',
          height: '19px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <EmojiPluginIcon style={{ width: '15px', height: '15px', paddingBottom: '2px' }} />
      </div>
    </Tooltip>
  );
};

SelectButton.propTypes = {
  t: PropTypes.func,
  theme: PropTypes.object,
};

export default SelectButton;
