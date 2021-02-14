import React from 'react';
import { AddIcon } from '../icons';
import PropTypes from 'prop-types';
import styles from '../../statics/styles/add-new-section.scss';
import classNames from 'classnames';
import Tooltip from 'wix-rich-content-common/libs/Tooltip';

const AddNewSection = ({ onClick, dataHook, shouldDisable, t }) => {
  return (
    <Tooltip content={shouldDisable && t('TablePlugin_SettingsModal_limitError')}>
      <div // eslint-disable-line
        data-hook={dataHook}
        onClick={onClick}
        className={classNames(styles.container, shouldDisable && styles.disabled)}
      >
        <AddIcon />
      </div>
    </Tooltip>
  );
};

AddNewSection.propTypes = {
  onClick: PropTypes.func.isRequired,
  dataHook: PropTypes.string,
  shouldDisable: PropTypes.bool,
  t: PropTypes.func,
};

export default AddNewSection;
