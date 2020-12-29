import React from 'react';
import { SelectTableIcon } from '../icons';
import PropTypes from 'prop-types';
import styles from '../../statics/styles/select-all.scss';
import classNames from 'classnames';

const SelectTable = ({ isActive, onClick }) => (
  //eslint-disable-next-line
  <div
    className={classNames(styles.selectAll, isActive && styles.activeSelectAll)}
    onClick={onClick}
    data-hook={'selectAllTableCells'}
  >
    <SelectTableIcon />
  </div>
);

SelectTable.propTypes = {
  isActive: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

export default SelectTable;
