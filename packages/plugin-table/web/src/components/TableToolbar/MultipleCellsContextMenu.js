/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from '../../../statics/styles/table-toolbar.scss';
import { getRange, getColsRange } from '../../tableUtils';

const getRowIndex = range => range[0].i;
const getColIndex = range => range[0].j;

class MultipleCellsContextMenu extends Component {
  getInsertRowOptions = range => [
    <div
      key={'insertAbove'}
      className={styles.option}
      onClick={() => this.props.addRow(getRowIndex(range))}
    >
      Insert 1 above
    </div>,
    <div
      key={'insertBelow'}
      className={styles.option}
      onClick={() => this.props.addRow(getRowIndex(range) + 1)}
    >
      Insert 1 below
    </div>,
  ];

  getInsertColOptions = range => [
    <div
      key={'insertRight'}
      className={styles.option}
      onClick={() => this.props.addCol(getColIndex(range) + 1)}
    >
      Insert 1 right
    </div>,
    <div
      key={'insertLeft'}
      className={styles.option}
      onClick={() => this.props.addCol(getColIndex(range))}
    >
      Insert 1 left
    </div>,
  ];

  getRowOptions = (range, selectedRows) => [
    <div
      key={'deleteRow'}
      className={styles.option}
      onClick={() => this.props.deleteRow(selectedRows)}
    >
      Delete row
    </div>,
    ...this.getInsertRowOptions(range),
  ];

  getColOptions = (range, selectedCols) => [
    <div
      key={'deleteCol'}
      className={styles.option}
      onClick={() => this.props.deleteColumn(selectedCols)}
    >
      Delete column
    </div>,
    ...this.getInsertColOptions(range),
  ];

  distributeRows = () =>
    this.props.table.distributeRows(this.props.innerEditorsRefs, getRange(this.props.selected));
  distributeColumns = () => this.props.table.distributeColumns(getColsRange(this.props.selected));
  merge = () => this.props.table.mergeCells(getRange(this.props.selected));
  clear = () => this.props.table.clearRange(getRange(this.props.selected));

  setToolbarWrapperRef = ref => (this.ToolbarWrapperRef = ref);

  render() {
    const { table, selected } = this.props;
    const range = selected && getRange(selected);
    const selectedRows = range && table.getSelectedRows(range);
    const selectedCols = range && table.getSelectedCols(range);
    const additionalOptions = selectedRows
      ? this.getRowOptions(range, selectedRows)
      : selectedCols
      ? this.getColOptions(range, selectedCols)
      : [];
    return (
      <div className={styles.moreMenu}>
        <div className={styles.option} onClick={this.distributeRows}>
          Distribute rows
        </div>
        <div className={styles.option} onClick={this.distributeColumns}>
          Distribute columns
        </div>
        <div className={styles.option} onClick={this.merge}>
          Merge cells
        </div>
        <div className={styles.option} onClick={this.clear}>
          Clear cells
        </div>
        {additionalOptions}
      </div>
    );
  }
}

MultipleCellsContextMenu.propTypes = {
  selected: PropTypes.object.isRequired,
  table: PropTypes.any,
  innerEditorsRefs: PropTypes.any,
  addCol: PropTypes.func.isRequired,
  addRow: PropTypes.func.isRequired,
  deleteColumn: PropTypes.func,
  deleteRow: PropTypes.func,
};

export default MultipleCellsContextMenu;
