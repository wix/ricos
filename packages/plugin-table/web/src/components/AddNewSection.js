import React from 'react';
import { AddIcon } from '../icons';
import PropTypes from 'prop-types';
import styles from '../../statics/styles/add-new-section.scss';
import classNames from 'classnames';
import Tooltip from 'wix-rich-content-common/libs/Tooltip';

const AddNewSection = ({ onClick, dataHook, disabled, t }) => {
  const Add = () => (
    //eslint-disable-next-line
    <div
      data-hook={dataHook}
      onClick={!disabled && onClick}
      className={classNames(styles.container, disabled && styles.disabled)}
    >
      <AddIcon />
    </div>
  );
  return disabled ? (
    <Tooltip content={t('TablePlugin_SettingsModal_limitError')}>
      <Add />
    </Tooltip>
  ) : (
    <Add />
  );
};

AddNewSection.propTypes = {
  onClick: PropTypes.func.isRequired,
  dataHook: PropTypes.string,
  disabled: PropTypes.bool,
  t: PropTypes.func,
};

export default AddNewSection;
