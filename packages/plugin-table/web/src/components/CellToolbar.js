/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { Component } from 'react';
import { BGColorIcon, BorderIcon, DuplicateIcon, BoldIcon, InsertIcon } from '../icons';
import PropTypes from 'prop-types';
import styles from '../../statics/styles/cell-toolbar.scss';
import { getRange } from '../tableUtils';
import ClickOutside from 'react-click-outside';

const getRowIndex = range => range[0].i;
const getColIndex = range => range[0].j;

class CellToolbar extends Component {
  constructor(props) {
    super(props);
    this.state = { showMoreMenu: false, showInsertMenu: false };
  }

  toggleMoreMenu = () => this.setState({ showMoreMenu: !this.state.showMoreMenu });

  closeMoreMenu = () => this.setState({ showMoreMenu: false });

  toggleInsert = () => this.setState({ showInsertMenu: !this.state.showInsertMenu });

  closeInsert = () => this.setState({ showInsertMenu: false });

  getInsertRowOptions = range => [
    <div
      key={'insertAbove'}
      className={styles.option}
      onClick={() => this.props.table.addRow(getRowIndex(range))}
    >
      Insert 1 above
    </div>,
    <div
      key={'insertBelow'}
      className={styles.option}
      onClick={() => this.props.table.addRow(getRowIndex(range) + 1)}
    >
      Insert 1 below
    </div>,
  ];

  getInsertColOptions = range => [
    <div
      key={'insertRight'}
      className={styles.option}
      onClick={() => this.props.table.addColumn(getColIndex(range) + 1)}
    >
      Insert 1 right
    </div>,
    <div
      key={'insertLeft'}
      className={styles.option}
      onClick={() => this.props.table.addColumn(getColIndex(range))}
    >
      Insert 1 left
    </div>,
  ];

  getRowOptions = range => [
    <div
      key={'deleteRow'}
      className={styles.option}
      onClick={() => this.props.table.deleteRow(getRowIndex(range))}
    >
      Delete row
    </div>,
    ...this.getInsertRowOptions(range),
  ];

  getColOptions = range => [
    <div
      key={'deleteCol'}
      className={styles.option}
      onClick={() => this.props.table.deleteColumn(getColIndex(range))}
    >
      Delete column
    </div>,
    ...this.getInsertColOptions(range),
  ];

  render() {
    const { table, selected, tableRef } = this.props;
    const range = selected && getRange(selected);
    const isRowSelected = table.isRowSelected(range);
    const isColSelected = table.isColSelected(range);
    const shouldShowContextMenu = isRowSelected || isColSelected || range?.length > 1;
    const shouldShowSplit = table.isParentCellSelected(range);
    const additionalOptions = isRowSelected
      ? this.getRowOptions(range)
      : isColSelected
      ? this.getColOptions(range)
      : [];
    const insertOptions = isRowSelected
      ? this.getInsertRowOptions(range)
      : isColSelected && this.getInsertColOptions(range);
    return selected ? (
      <div className={styles.container}>
        <div className={styles.toolbar}>
          <BoldIcon className={styles.icon} onClick={() => table.formattingCells('BOLD', range)} />
          <BGColorIcon
            className={styles.icon}
            onClick={() => table.setCellsStyle({ backgroundColor: 'pink' }, range)}
          />
          <BorderIcon
            className={styles.icon}
            onClick={() => table.setCellsStyle({ border: '1px solid black' }, range)}
          />
          {shouldShowSplit && (
            <DuplicateIcon className={styles.icon} onClick={() => table.splitCell(range)} />
          )}
          {insertOptions && (
            <ClickOutside
              className={styles.insertButton}
              onClick={this.toggleInsert}
              onClickOutside={this.closeInsert}
            >
              <InsertIcon className={styles.icon} />
              {this.state.showInsertMenu && <div className={styles.moreMenu}>{insertOptions}</div>}
            </ClickOutside>
          )}
        </div>
        {shouldShowContextMenu && (
          <ClickOutside
            className={styles.moreToolbar}
            onClick={this.toggleMoreMenu}
            onClickOutside={this.closeMoreMenu}
          >
            ...
            {this.state.showMoreMenu && (
              <div className={styles.moreMenu}>
                <div
                  className={styles.option}
                  onClick={() => table.distributeRows(tableRef, range)}
                >
                  Distribute rows
                </div>
                <div className={styles.option} onClick={() => table.distributeColumns(range)}>
                  Distribute columns
                </div>
                <div className={styles.option} onClick={() => table.mergeCells(range)}>
                  Merge cells
                </div>
                <div className={styles.option} onClick={() => table.clearRange(range)}>
                  Clear cells
                </div>
                {additionalOptions}
              </div>
            )}
          </ClickOutside>
        )}
      </div>
    ) : null;
  }
}

CellToolbar.propTypes = {
  selected: PropTypes.object.isRequired,
  table: PropTypes.any,
  tableRef: PropTypes.any,
};

export default CellToolbar;
