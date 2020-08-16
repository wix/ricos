import React from 'react';
import { BGColorIcon, BorderIcon, DeleteIcon, DuplicateIcon, BoldIcon } from '../icons';
import PropTypes from 'prop-types';
import styles from '../../statics/styles/cell-toolbar.scss';

const CellToolbar = ({ selected, table }) => {
  const isRowSelected = table.isRowSelected(selected);
  const isColSelected = table.isColSelected(selected);
  const shouldShowContextMenu = isRowSelected || isColSelected;
  const shouldShowSplit = table.isParentCellSelected(selected);
  const shouldShowMerge = selected && table.isMultipleCellSelected(selected);

  return selected ? (
    <div className={styles.container}>
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
      {isRowSelected && <DeleteIcon onClick={() => table.distributeColumns()} />}
      {isColSelected && <DeleteIcon onClick={() => table.distributeRows()} />}
    </div>
  ) : null;
};

CellToolbar.propTypes = {
  selected: PropTypes.object.isRequired,
  table: PropTypes.any,
};

export default CellToolbar;
