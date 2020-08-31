import React from 'react';
import { SelectTableIcon } from '../icons';
import PropTypes from 'prop-types';
import ClickOutside from 'react-click-outside';
import styles from '../../statics/styles/select-all.scss';
import classNames from 'classnames';

const SelectTable = ({ onClickOutside, isActive, onClick }) => (
  <ClickOutside
    onClickOutside={onClickOutside}
    className={classNames(styles.selectAll, isActive && styles.activeSelectAll)}
    onClick={onClick}
  >
    <SelectTableIcon />
  </ClickOutside>
);

SelectTable.propTypes = {
  isActive: PropTypes.bool.isRequired,
  onClickOutside: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default SelectTable;
