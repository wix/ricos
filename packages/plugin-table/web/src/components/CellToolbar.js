/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { Component } from 'react';
import { BGColorIcon, BorderIcon, DeleteIcon, DuplicateIcon, BoldIcon } from '../icons';
import PropTypes from 'prop-types';
import styles from '../../statics/styles/cell-toolbar.scss';

class CellToolbar extends Component {
  constructor(props) {
    super(props);
    this.state = { showMoreMenu: false };
  }

  toggleMoreMenu = () => this.setState({ showMoreMenu: !this.state.showMoreMenu });

  render() {
    const { table, selected, tableRef } = this.props;
    const isRowSelected = table.isRowSelected(selected);
    const isColSelected = table.isColSelected(selected);
    const shouldShowContextMenu = isRowSelected || isColSelected;
    const shouldShowSplit = table.isParentCellSelected(selected);
    const shouldShowMerge = selected && table.isMultipleCellSelected(selected);

    return selected ? (
      <div className={styles.container}>
        <div className={styles.toolbar}>
          <BoldIcon className={styles.icon} onClick={() => table.formattingCells('BOLD')} />
          <BGColorIcon
            className={styles.icon}
            onClick={() => table.setCellsStyle({ backgroundColor: 'pink' }, selected)}
          />
          <BorderIcon
            className={styles.icon}
            onClick={() => table.setCellsStyle({ border: '1px solid black' }, selected)}
          />
          {shouldShowMerge && (
            <DuplicateIcon className={styles.icon} onClick={() => table.mergeCells(selected)} />
          )}
          {shouldShowSplit && (
            <DuplicateIcon className={styles.icon} onClick={() => table.splitCell(selected)} />
          )}
          {shouldShowContextMenu && <DeleteIcon />}
        </div>
        {table.isMultipleCellSelected(selected) && (
          <div className={styles.moreToolbar} onClick={this.toggleMoreMenu}>
            ...
            {this.state.showMoreMenu && (
              <div className={styles.moreMenu}>
                <div
                  className={styles.option}
                  onClick={() => table.distributeRows(tableRef, selected)}
                >
                  Distribute Rows
                </div>
                <div className={styles.option} onClick={() => table.distributeColumns(selected)}>
                  Distribute Columns
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
