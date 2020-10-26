/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from '../../../statics/styles/table-toolbar.scss';
import { getRange } from '../../tableUtils';

class SingleCellContextMenu extends Component {
  clear = () => this.props.table.clearRange(getRange(this.props.selected));
  selectRow = () => {
    const selectedRow = this.props.selected.start.i;
    this.props.selectRows({ start: selectedRow, end: selectedRow });
  };
  selectCol = () => {
    const selectedCol = this.props.selected.start.j;
    this.props.selectCols({ start: selectedCol, end: selectedCol });
  };

  render() {
    return (
      <div className={styles.moreMenu}>
        <div className={styles.option} onClick={this.clear}>
          Clear cell
        </div>
        <div className={styles.option} onClick={this.selectRow}>
          Select row
        </div>
        <div className={styles.option} onClick={this.selectCol}>
          Select column
        </div>
      </div>
    );
  }
}

SingleCellContextMenu.propTypes = {
  selected: PropTypes.object.isRequired,
  table: PropTypes.any,
  selectRows: PropTypes.func,
  selectCols: PropTypes.func,
};

export default SingleCellContextMenu;
