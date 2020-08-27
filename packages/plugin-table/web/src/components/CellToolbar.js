/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { Component } from 'react';
import { BGColorIcon, BorderIcon, DeleteIcon, DuplicateIcon, BoldIcon } from '../icons';
import PropTypes from 'prop-types';
import styles from '../../statics/styles/cell-toolbar.scss';
import { getRange } from '../tableUtils';

class CellToolbar extends Component {
  constructor(props) {
    super(props);
    this.state = { showMoreMenu: false };
  }

  toggleMoreMenu = () => this.setState({ showMoreMenu: !this.state.showMoreMenu });

  render() {
    const { table, selected, tableRef } = this.props;
    const range = selected && getRange(selected);
    const isRowSelected = table.isRowSelected(range);
    const isColSelected = table.isColSelected(range);
    const shouldShowContextMenu = isRowSelected || isColSelected;
    const shouldShowSplit = table.isParentCellSelected(range);
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
          {shouldShowContextMenu && <DeleteIcon />}
        </div>
        {range.length > 1 && (
          <div className={styles.moreToolbar} onClick={this.toggleMoreMenu}>
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
              </div>
            )}
          </div>
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
