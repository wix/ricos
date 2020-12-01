import {
  createEmptyCellEditor,
  getRange,
  createEmptyRow,
  createEmptyCell,
  TableDataUtil,
} from '../tableUtils';
import { cloneDeepWithoutEditorState } from 'wix-rich-content-editor-common';
import { CELL_MIN_WIDTH, ROW_DEFAULT_HEIGHT, COL_DEFAULT_WIDTH } from '../consts';
import { isNumber, isEmpty } from 'lodash';
import { generateKey } from 'wix-rich-content-plugin-commons';

const setRowsCell = (rows, cell, i, j) => (rows[i].columns[j] = cell);
const setCellContent = (rows, content, i, j) => (rows[i].columns[j].content = content);

class Table extends TableDataUtil {
  constructor(componentData = {}, saveNewDataFunc) {
    super(componentData);
    this.saveNewDataFunc = saveNewDataFunc;
    this.contentMaxHeight = 0;
  }

  setNewRows = rows => {
    this.componentData.config.rows = rows;
    this.saveNewDataFunc(this.componentData);
  };

  handlePasteCellsOutOfBound = (copiedCellsRange, targetRow, targetCol) => {
    const rows = this.getRows();
    const copiedRowsNum =
      copiedCellsRange[copiedCellsRange.length - 1].i - copiedCellsRange[0].i + 1;
    const copiedColsNum =
      copiedCellsRange[copiedCellsRange.length - 1].j - copiedCellsRange[0].j + 1;
    const rowNum = this.getRowNum();
    const colNum = this.getColNum();
    const rowsOutOfBoundNum = targetRow + copiedRowsNum - rowNum;
    const colsOutOfBoundNum = targetCol + copiedColsNum - colNum;
    if (rowsOutOfBoundNum > 0) {
      [...Array(rowsOutOfBoundNum).fill(0)].forEach((value, i) => {
        const rowIndex = i + rowNum;
        this.addNewRowHeight(rowIndex);
        rows[rowIndex] = createEmptyRow(colNum);
      });
    }
    if (colsOutOfBoundNum > 0) {
      //eslint-disable-next-line
      Object.entries(rows).forEach(([i, row]) => {
        [...Array(colsOutOfBoundNum).fill(0)].forEach((value, i) => {
          const colIndex = i + colNum - 1 + colsOutOfBoundNum;
          this.addNewColWidth(colIndex);
          row.columns[colIndex] = createEmptyCell();
        });
      });
    }
  };

  pasteCells = (copiedCellsRange, targetRow, targetCol) => {
    const rows = this.getRows();
    this.handlePasteCellsOutOfBound(copiedCellsRange, targetRow, targetCol);
    const rowDiff = targetRow - copiedCellsRange[0].i;
    const colDiff = targetCol - copiedCellsRange[0].j;
    const cellsWithPaste = cloneDeepWithoutEditorState(rows);
    copiedCellsRange.forEach(({ i, j }) => {
      setCellContent(cellsWithPaste, this.getCellContent(i, j), i + rowDiff, j + colDiff);
    });
    this.setNewRows(cellsWithPaste);
  };

  clearRange = range => {
    const rows = this.getRows();
    range.forEach(({ i, j }) => setCellContent(rows, createEmptyCellEditor(), i, j));
    this.setNewRows(rows);
  };

  isObjectsEqual = (o1, o2) => JSON.stringify(o1) === JSON.stringify(o2);

  updateCellContent = (i, j, content) => {
    const oldContent = this.getCell(i, j).content;
    if (!this.isObjectsEqual(oldContent, content)) {
      this.getCell(i, j).content = content;
      this.saveNewDataFunc(this.componentData);
    }
  };

  addNewRowHeight = index => this.getRowsHeight().splice(index, 0, ROW_DEFAULT_HEIGHT);

  addNewColWidth = index => this.getColsWidth().splice(index, 0, COL_DEFAULT_WIDTH);

  addRow = index => {
    const rows = this.getRows();
    const cellsWithNewRow = { [index]: createEmptyRow(this.getColNum()) };
    Object.entries(rows).forEach(([i, row]) => {
      if (i >= index) {
        cellsWithNewRow[parseInt(i) + 1] = row;
      } else if (i < index) {
        cellsWithNewRow[i] = row;
      }
    });
    Object.entries(cellsWithNewRow[index].columns).forEach(([j]) => {
      if (
        !isEmpty(this.getCellMergeData(index - 1, j)) &&
        !isEmpty(this.getCellMergeData(index, j))
      ) {
        this.addNewCellToMergeRange(index - 1, j, cellsWithNewRow[index].columns[j]);
      }
    });
    this.addNewRowHeight(index);
    this.setNewRows(cellsWithNewRow);
  };

  addColumn = index => {
    const rows = this.getRows();
    const cellsWithNewCol = {};
    //eslint-disable-next-line
    Object.entries(rows).forEach(([i, row]) => {
      cellsWithNewCol[i] = { ...row };
      Object.entries(row.columns).forEach(([j, column]) => {
        if (j >= index) {
          cellsWithNewCol[i].columns[parseInt(j) + 1] = column;
        } else if (j < index) {
          cellsWithNewCol[i].columns[j] = column;
        }
      });
      cellsWithNewCol[i].columns[index] = createEmptyCell();
      if (
        !isEmpty(this.getCellMergeData(i, index - 1)) &&
        !isEmpty(this.getCellMergeData(i, index + 1))
      ) {
        this.addNewCellToMergeRange(i, index - 1, cellsWithNewCol[i].columns[index], true);
      }
    });
    this.addNewColWidth(index);
    const newColsWidth = this.getColsWidth().map(colWith => {
      if (isNumber(colWith)) {
        return colWith - 20 > CELL_MIN_WIDTH ? colWith - 20 : CELL_MIN_WIDTH;
      }
      return colWith;
    });
    this.componentData.config.colsWidth = newColsWidth;
    this.setNewRows(cellsWithNewCol);
  };

  setCellsStyle = (style, range) => {
    range.forEach(({ i, j }) => {
      const cell = this.getCell(i, j);
      cell.style = { ...(cell.style || {}), ...style };
    });
    this.setNewRows(this.componentData.config.rows);
  };

  fixSiblingsCellsBorders = (i, j, cellBorders) => {
    const { rowSpan = 1, colSpan = 1 } = this.getCellMergeData(i, j) || {};
    const fixSiblingCell = (i, j, borederType) => {
      const cell = this.getCell(i, j);
      if (cell?.border) {
        // eslint-disable-next-line no-unused-vars
        const { [borederType]: border, ...rest } = cell.border;
        cell.border = rest;
      }
    };

    [...Array(colSpan).fill(0)].forEach((col, colIndex) => {
      cellBorders.top && fixSiblingCell(i - 1, j + colIndex, 'bottom');
      cellBorders.bottom && fixSiblingCell(i + rowSpan, j + colIndex, 'top');
    });

    [...Array(rowSpan).fill(0)].forEach((row, rowIndex) => {
      cellBorders.left && fixSiblingCell(i + rowIndex, j - 1, 'right');
      cellBorders.right && fixSiblingCell(i + rowIndex, j + colSpan, 'left');
    });
  };

  setCellsSelectionBorderStyle = (borderColor, selection, setAllBorders) => {
    const range = getRange(selection);
    range.forEach(({ i, j }) => {
      const cell = this.getCell(i, j);
      const cellBorders = setAllBorders
        ? { top: borderColor, left: borderColor, right: borderColor, bottom: borderColor }
        : this.getCellBorders(selection, i, j, borderColor);
      this.fixSiblingsCellsBorders(i, j, cellBorders);
      cell.border = {
        ...(cell.border || {}),
        ...cellBorders,
      };
    });
    this.setNewRows(this.componentData.config.rows);
  };

  setColumnWidth = (range, width) => {
    range.forEach(({ j }) => {
      const colsWidth = this.getColsWidth();
      colsWidth[j] = width;
    });
    this.saveNewDataFunc(this.componentData);
  };

  setRowHeight = (range, height) => {
    range.forEach(({ i }) => {
      const rowsHeight = this.getRowsHeight();
      rowsHeight[i] = height;
    });
    this.setNewRows(this.componentData.config.rows);
  };

  distributeColumns = range => {
    const colsWidth = this.getColsWidth();
    range.forEach(i => (colsWidth[i] = COL_DEFAULT_WIDTH));
    this.saveNewDataFunc(this.componentData);
  };

  distributeRows = (innerEditorsRefs, range) => {
    let maxContentHeight = 0;
    range.forEach(({ i, j }) => {
      const height = innerEditorsRefs[`${i}-${j}`].editorHeight + 20;
      if (height > maxContentHeight) {
        maxContentHeight = height;
      }
    });
    this.setRowHeight(range, maxContentHeight);
  };

  isRowInsideMergeRange = (i, j) =>
    !isEmpty(this.getCellMergeData(i - 1, j)) && !isEmpty(this.getCellMergeData(i, j));

  deleteRow = deleteIndexes => {
    const rows = this.getRows();
    const cellsWithoutRow = {};
    const rowNum = this.getRowNum();
    this.fixDeletedMergedCellsData(deleteIndexes);
    [...Array(rowNum).fill(0)].forEach((value, i) => {
      if (i < deleteIndexes[0]) {
        cellsWithoutRow[i] = rows[i];
      } else if (i > deleteIndexes[deleteIndexes.length - 1]) {
        cellsWithoutRow[parseInt(i) - deleteIndexes.length] = rows[i];
      }
    });
    this.getRowsHeight().splice(deleteIndexes, deleteIndexes.length);
    this.setNewRows(cellsWithoutRow);
  };

  reduceCellSpan = (cell, isCol) => (isCol ? cell.merge.colSpan-- : cell.merge.rowSpan--);

  fixDeletedMergedCellsData = (deleteIndexes, isCol) => {
    const rows = this.getRows();
    deleteIndexes.forEach(i => {
      const parentPos = isCol
        ? this.getColCellsParentPosition(i)
        : this.getRowCellsParentPosition(i);
      const parentCell = parentPos && this.getCell(parentPos.i, parentPos.j);
      const isParentDeleted = isCol ? parentPos?.j === i : parentPos?.i === i;
      const isChildDeleted =
        parentCell &&
        (isCol
          ? i > parentPos.j && i < parentCell.merge.colSpan + parentPos.j
          : i > parentPos.i && i < parentCell.merge.rowSpan + parentPos.i);
      if (isParentDeleted) {
        let nextParentCell;
        if (isCol && parentCell.merge.colSpan > 1) {
          nextParentCell = { i: parseInt(parentPos.i), j: parseInt(parentPos.j) + 1 };
        } else if (!isCol && parentCell.merge.rowSpan > 1) {
          nextParentCell = { i: parseInt(parentPos.i) + 1, j: parseInt(parentPos.j) };
        }
        this.reduceCellSpan(parentCell, isCol);
        nextParentCell &&
          rows[nextParentCell.i]?.columns[nextParentCell.j] &&
          (rows[nextParentCell.i].columns[nextParentCell.j] = parentCell);
      } else if (isChildDeleted) {
        this.reduceCellSpan(parentCell, isCol);
      }
    });
  };

  addNewCellToMergeRange = (i, j, cell, isCol) => {
    let parentCellPos;
    const { parentCellKey, rowSpan, colSpan } = this.getCellMergeData(i, j) || {};
    if (parentCellKey) {
      const { row, col } = this.getParentCell(parentCellKey);
      cell.merge = { parentCellKey };
      parentCellPos = { i: row, j: col };
    } else if (rowSpan > 1 || colSpan > 1) {
      cell.merge = { parentCellKey: this.getCellMergeData(i, j).key };
      parentCellPos = { i, j };
    }
    if (isCol && parentCellPos.i === i) {
      this.getCellMergeData(parentCellPos.i, parentCellPos.j).colSpan++;
    } else if (!isCol && parentCellPos.j === j) {
      this.getCellMergeData(parentCellPos.i, parentCellPos.j).rowSpan++;
    }
  };

  deleteColumn = deleteIndexes => {
    const rows = this.getRows();
    const cellsWithoutCol = {};
    const colNum = this.getColNum();
    this.fixDeletedMergedCellsData(deleteIndexes, true);
    Object.entries(rows).forEach(([i, row]) => {
      cellsWithoutCol[i] = createEmptyRow(colNum - deleteIndexes.length);
      Object.entries(row.columns).forEach(([j, column]) => {
        if (j < deleteIndexes[0]) {
          setRowsCell(cellsWithoutCol, column, i, j);
        } else if (j > deleteIndexes[deleteIndexes.length - 1]) {
          setRowsCell(cellsWithoutCol, column, i, parseInt(j) - deleteIndexes.length);
        }
      });
    });
    this.getColsWidth().splice(deleteIndexes, deleteIndexes.length);
    this.setNewRows(cellsWithoutCol);
  };

  mergeCells = range => {
    const rows = this.getRows();
    const { i: parentRow, j: parentCol } = range[0];
    const { i: lastChildRow, j: lastChildCol } = range[range.length - 1];
    const childrenRange = range.slice(1);
    const parentCell = this.getCell(parentRow, parentCol);
    const key = generateKey();
    parentCell.merge = {
      ...(parentCell.merge || {}),
      key,
      rowSpan: lastChildRow - parentRow + 1,
      colSpan: lastChildCol - parentCol + 1,
    };
    childrenRange.forEach(
      ({ i, j }) =>
        (this.getCell(i, j).merge = {
          ...(this.getCell(i, j).merge || {}),
          parentCellKey: key,
        })
    );
    this.setNewRows(rows);
  };

  splitCell = range => {
    const rows = this.getRows();
    const parentCells = this.getSelectedParentCells(range);
    parentCells.forEach(({ i, j }) => {
      const parentCell = this.getCell(i, j);
      const { rowSpan, colSpan } = parentCell.merge;
      if (rowSpan > 1 || colSpan > 1) {
        [...Array(rowSpan).fill(0)].forEach((row, rowIndex) => {
          [...Array(colSpan).fill(0)].forEach((col, colIndex) => {
            this.getCell(i + rowIndex, j + colIndex).merge = {};
          });
        });
      }
    });
    this.setNewRows(rows);
  };

  getSelectedParentCells = (range = []) => {
    const parentCells = [];
    range.forEach(({ i, j }) => {
      const mergeData = this.getCellMergeData(i, j);
      if (mergeData?.rowSpan > 1 || mergeData?.colSpan > 1) {
        parentCells.push({ i, j });
      }
    });
    return parentCells;
  };

  isAllMergeRangeSelected = (range = []) => {
    let isAllMergeRangeSelected = true;
    let totalChildrenNum = 0;
    const mergeCells = [];
    const parentCells = [];
    range.forEach(({ i, j }) => {
      const { parentCellKey, key, rowSpan, colSpan } = this.getCellMergeData(i, j) || {};
      parentCellKey && mergeCells.push({ i, j, parentCellKey });
      key && parentCells.push({ i, j, key, rowSpan, colSpan });
    });
    parentCells.forEach(({ rowSpan, colSpan, key }) => {
      const numOfChildren = rowSpan * colSpan - 1;
      totalChildrenNum += numOfChildren;
      mergeCells.filter(({ parentCellKey }) => parentCellKey === key).length !== numOfChildren &&
        (isAllMergeRangeSelected = false);
    });
    isAllMergeRangeSelected &&
      mergeCells.length !== totalChildrenNum &&
      (isAllMergeRangeSelected = false);
    return isAllMergeRangeSelected;
  };

  reorderColumns = (from, to) => {
    const rows = this.getRows();
    const isAddedToLaterCol = from.start < to;
    const numOfColsToReorder = from.end - from.start + 1;
    const dropIndex = isAddedToLaterCol ? to - numOfColsToReorder : to;
    const cellsWithReorder = cloneDeepWithoutEditorState(rows);
    Object.entries(cellsWithReorder).forEach(([i, row]) => {
      //eslint-disable-next-line
      Object.entries(row.columns).forEach(([j, column]) => {
        const cellToSet = this.getCell(i, j);
        if (isAddedToLaterCol && j > from.end && j < dropIndex + numOfColsToReorder) {
          row.columns[parseInt(j) - numOfColsToReorder] = cellToSet;
        } else if (!isAddedToLaterCol && j >= to && j < from.start) {
          row.columns[parseInt(j) + numOfColsToReorder] = cellToSet;
        } else if (j >= from.start && j <= from.end) {
          row.columns[dropIndex + parseInt(j) - from.start] = cellToSet;
        }
      });
    });
    this.setNewRows(cellsWithReorder);
  };

  reorderRows = (from, to) => {
    const rows = this.getRows();
    const isAddedToLaterRow = from.start < to;
    const numOfColsToReorder = from.end - from.start + 1;
    const dropIndex = isAddedToLaterRow ? to - numOfColsToReorder : to;
    const cellsWithReorder = cloneDeepWithoutEditorState(rows);
    //eslint-disable-next-line
    Object.entries(cellsWithReorder).forEach(([i, row]) => {
      const rowToSet = rows[i];
      if (isAddedToLaterRow && i > from.end && i < dropIndex + numOfColsToReorder) {
        cellsWithReorder[parseInt(i) - numOfColsToReorder] = rowToSet;
      } else if (!isAddedToLaterRow && i >= to && i < from.start) {
        cellsWithReorder[parseInt(i) + numOfColsToReorder] = rowToSet;
      } else if (i >= from.start && i <= from.end) {
        cellsWithReorder[dropIndex + parseInt(i) - from.start] = rowToSet;
      }
    });
    this.setNewRows(cellsWithReorder);
  };

  toggleRowHeader = () => {
    this.componentData.config.rowHeader = !this.componentData.config.rowHeader;
    this.saveNewDataFunc(this.componentData);
  };

  toggleColHeader = () => {
    this.componentData.config.colHeader = !this.componentData.config.colHeader;
    this.saveNewDataFunc(this.componentData);
  };
}

export default Table;
