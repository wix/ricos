/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { createRef } from 'react';
import PropTypes from 'prop-types';
import TableViewer from './table-viewer';
import styles from '../statics/styles/table-component.scss';
import Table from './domain/table';
import { getRange, getRowsRange, getColsRange } from './domain/tableDataUtil';
import { createEmptyCellEditor, isCellsNumberInvalid } from './tableUtil';
import { AddNewSection, Rows } from './components';
import TableToolbar from './TableToolbar/TableToolbar';
import { isPluginFocused, TOOLBARS, KEYS_CHARCODE } from 'wix-rich-content-editor-common';
import { isEmpty, isNumber } from 'lodash';
import classNames from 'classnames';
import './styles.css';

class TableComponent extends React.Component {
  constructor(props) {
    super(props);
    this.rowsRefs = [];
    this.state = {
      isEditingActive: false,
      isAllCellsSelected: false,
      selected: {},
    };
    this.innerRceAdditionalProps = { placeholder: '' };
    this.innerEditorsRefs = {};
    this.table = new Table(props.componentData, this.updateComponentData);
    this.tableRef = createRef();
    this.tableContainer = createRef();
    this.dragPreview = createRef();
    this.rowDragProps = {
      onDragClick: selected => this.selectRows(selected, true),
      onDragEnd: this.onRowDragEnd,
      onDrag: this.onRowDrag,
    };
    this.colDragProps = {
      onDragClick: selected => this.selectCols(selected, true),
      onDragEnd: this.onColDragEnd,
      onDrag: this.onColDrag,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (
      !isPluginFocused(nextProps.block, nextProps.selection) &&
      isPluginFocused(this.props.block, this.props.selection)
    ) {
      this.setSelected();
    }
  }

  getCellState = (i, j) => this.table.getCellContent(i, j) || createEmptyCellEditor();

  renderInnerRCE = (i, j) => {
    const editorState = this.getCellState(i, j);
    return this.props.renderInnerRCE({
      editorState,
      onChange: editorState => this.table.updateCellContent(i, j, editorState),
      renderedIn: 'table',
      additionalProps: this.innerRceAdditionalProps,
      toolbarsToIgnore: ['InlineTextToolbar'],
      tablePluginMenu: true,
    });
  };

  selectRows = (rowsIndexes, disableSelectedStyle) => {
    const selected = rowsIndexes ? this.table.getRowsSelection(rowsIndexes) : {};
    this.setSelected(selected, disableSelectedStyle);
  };

  selectCols = (colsIndexes, disableSelectedStyle) => {
    const selected = colsIndexes ? this.table.getColsSelection(colsIndexes) : {};
    this.setSelected(selected, disableSelectedStyle);
  };

  setEditingActive = isEditingActive => {
    this.props.disableKeyboardEvents(isEditingActive);
    this.setState({ isEditingActive });
  };

  getCellEditorRef = (i, j) => this.innerEditorsRefs[`${i}-${j}`];

  getCellToolbarProps = (i, j) => this.getCellEditorRef(i, j)?.getToolbarProps(TOOLBARS.FORMATTING);

  distributeRows = selected => {
    this.table.distributeRows(this.innerEditorsRefs, getRowsRange(selected));
    this.setSelected();
  };

  distributeColumns = selected => {
    this.table.distributeColumns(getColsRange(selected));
    this.setSelected();
  };

  isCellEmpty = (i, j) =>
    this.table
      .getCellContent(i, j)
      .getCurrentContent()
      .getBlocksAsArray()[0]
      .getText() === '';

  handleFirstCellEmpty = toolbarPropsBeforeOrganize => {
    toolbarPropsBeforeOrganize.forEach((element, index) => {
      const firstElement = toolbarPropsBeforeOrganize[0];
      if (
        this.isCellEmpty(firstElement.indexes.i, firstElement.indexes.j) &&
        !this.isCellEmpty(element.indexes.i, element.indexes.j)
      ) {
        const temp = toolbarPropsBeforeOrganize[0];
        toolbarPropsBeforeOrganize[0] = element;
        toolbarPropsBeforeOrganize[index] = temp;
      }
    });
    return toolbarPropsBeforeOrganize.map(element => element.toolbarProps);
  };

  setToolbarProps = selected => {
    if (selected) {
      const range = getRange(selected);
      const toolbarPropsBeforeOrganize = [];
      range.forEach(({ i, j }) => {
        this.getCellEditorRef(i, j) &&
          toolbarPropsBeforeOrganize.push({
            toolbarProps: this.getCellToolbarProps(i, j),
            indexes: { i, j },
          });
      });
      const toolbarProps = this.handleFirstCellEmpty(toolbarPropsBeforeOrganize);
      this.toolbarRef?.setToolbarProps(toolbarProps);
    } else {
      this.toolbarRef?.setToolbarProps();
    }
  };

  setSelected = (selected, disableSelectedStyle) => {
    const isAllCellsSelected = this.isAllCellsSelected(selected);
    this.setState(
      {
        selected,
        isAllCellsSelected,
        highlightColResizer: false,
        highlightRowResizer: false,
        disableSelectedStyle,
      },
      () => this.setToolbarProps(selected)
    );
  };

  isAllCellsSelected = selected =>
    selected && this.table.isAllCellsSelected(selected.start, selected.end);

  onSelect = selected => {
    this.setSelected(this.table.fixSelectedWithMergeCells(selected));
  };

  getFirstCellRef = () => {
    const { selected } = this.state;
    let firstSelectedCellRef;
    if (!isEmpty(selected)) {
      const firstSelectedCell = getRange(selected)[0];
      const firstSelectedRowRef = this.rowsRefs[firstSelectedCell.i];
      Array.from(firstSelectedRowRef?.children || []).forEach((col, i) => {
        if (i === firstSelectedCell.j) {
          firstSelectedCellRef = col;
        }
      });
    }
    return firstSelectedCellRef;
  };

  setCellContent = (content, row, col) => {
    const rows = this.table.getRows();
    this.table.setCellContent(rows, content, row, col);
    this.table.setNewRows(rows);
  };

  onKeyDown = e => {
    const { selected } = this.state;
    if (this.shouldHandleKeyDown(e)) {
      if (e.key === 'a' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        this.setAllCellsSelected();
      } else if (e.keyCode === KEYS_CHARCODE.SPACE) {
        let indexes, selectFunc;
        if (e.ctrlKey) {
          indexes = getColsRange(selected);
          selectFunc = this.selectCols;
        } else if (e.shiftKey) {
          indexes = getRowsRange(selected);
          selectFunc = this.selectRows;
        }
        if (indexes) {
          selectFunc({ start: Math.min(...indexes), end: Math.max(...indexes) });
          e.stopPropagation();
        }
      } else if (e.key === '+' && e.altKey && e.ctrlKey) {
        const selectedCols = this.table.getSelectedCols(getRange(selected));
        selectedCols ? this.addCol(Math.max(...selectedCols) + 1) : this.addLastCol();
      } else if (e.key === '-' && e.altKey && e.ctrlKey) {
        const selectedCols = this.table.getSelectedCols(getRange(selected));
        const colNum = this.table.getColNum();
        selectedCols
          ? this.deleteColumn([Math.min(Math.max(...selectedCols) + 1, colNum - 1)])
          : this.deleteColumn([colNum - 1]);
      }
    }
  };

  shouldHandleKeyDown = e => {
    const { selected, isEditingActive } = this.state;
    const isColorPickerModalOpen = e.target.closest('[data-id=color-picker-modal]');
    return (
      isPluginFocused(this.props.block, this.props.selection) &&
      selected &&
      !isEditingActive &&
      !isColorPickerModalOpen
    );
  };

  onPaste = (copiedCells, start) => {
    this.table.pasteCells(copiedCells, start.i, start.j);
    this.setSelectionOnPastedCells(copiedCells);
  };

  setSelectionOnPastedCells = copiedCells => {
    const { selected } = this.state;
    const { i: startI, j: startJ } = copiedCells[0];
    const { i: endI, j: endJ } = copiedCells[copiedCells.length - 1];
    const copiedRowsNum = endI - startI + 1;
    const copiedColsNum = endJ - startJ + 1;
    this.setSelected({
      ...selected,
      end: { i: selected.start.i + copiedRowsNum - 1, j: selected.start.j + copiedColsNum - 1 },
    });
  };

  setAllCellsSelected = () =>
    this.setSelected(this.table.getAllCellsSelection(this.props.componentData));

  toggleAllCellsSelection = () => {
    const { isAllCellsSelected } = this.state;
    if (isAllCellsSelected) {
      this.setSelected();
      this.setState({ isAllCellsSelected: false });
    } else {
      this.setAllCellsSelected();
    }
    this.setState({ isAllCellsSelected: !isAllCellsSelected });
  };

  handleClickOutsideSelectAll = () => {
    !this.isAllCellsSelected(this.state.selected) && this.setState({ isAllCellsSelected: false });
  };

  updateComponentData = data =>
    this.props.store.set('componentData', { ...data }, this.props.block.getKey());

  onResizeCol = columnsRefs =>
    this.table.setColWidthAfterResize(columnsRefs, this.tableRef.current.offsetWidth);

  onResizeRow = (i, height) =>
    this.table.setRowHeight(
      getRowsRange(this.table.getRowsSelection({ start: i, end: i })),
      height
    );

  setToolbarRef = ref => (this.toolbarRef = ref);

  highlightResizer = (i, isCol) => {
    if (isCol && this.state.highlightColResizer !== i) {
      this.setState({ highlightColResizer: i });
    } else if (!isCol && this.state.highlightRowResizer !== i) {
      this.setState({ highlightRowResizer: i });
    }
  };

  isPositionInBoundaries = (boundary, pos) => boundary - 10 < pos && pos < boundary + 10;

  onColDragEnd = (e, dragsIndex) => {
    dragsIndex && this.colDropIndex && this.table.reorderColumns(dragsIndex, this.colDropIndex);
    this.setState({ highlightColResizer: false });
    this.resetDrag();
    this.colDropIndex = null;
  };

  onRowDragEnd = (e, dragsIndex) => {
    dragsIndex && this.rowDropIndex && this.table.reorderRows(dragsIndex, this.rowDropIndex);
    this.setState({ highlightRowResizer: false });
    this.resetDrag();
    this.dropTop = null;
    this.dragPadding = null;
    this.rowDropIndex = null;
  };

  resetDrag = () => {
    this.dragPreview.current && (this.dragPreview.current.style.visibility = 'hidden');
    this.setSelected();
  };

  addRow = i => {
    if (!isCellsNumberInvalid(this.table.getRowNum() + 1, this.table.getColNum())) {
      this.table.addRow(i);
      this.selectRows({ start: i, end: i });
    }
  };

  merge = () => {
    const { selected } = this.state;
    this.table.mergeCells(getRange(selected));
    const newI = selected.start.i < selected.end.i ? selected.start.i : selected.end.i;
    const newJ = selected.start.j < selected.end.j ? selected.start.j : selected.end.j;
    this.setSelected({ start: { i: newI, j: newJ }, end: { i: newI, j: newJ } });
  };

  getCellsFixedWidth = () => {
    let fixedWidth = 0;
    this.table.getColsWidth().forEach(width => isNumber(width) && (fixedWidth += width));
    return fixedWidth;
  };

  addCol = i => {
    if (!isCellsNumberInvalid(this.table.getRowNum(), this.table.getColNum() + 1)) {
      this.table.addColumn(i);
      this.selectCols({ start: i, end: i });
    }
  };

  deleteRow = deleteIndexes => {
    this.table.deleteRow(deleteIndexes);
    this.setSelected();
  };

  deleteColumn = deleteIndexes => {
    this.table.deleteColumn(deleteIndexes);
    this.setSelected();
  };

  addLastRow = () => this.addRow(this.table.getRowNum());

  addLastCol = () => this.addCol(this.table.getColNum());

  onColDrag = (e, dragsIndex) => {
    e.movementX > 0 ? (this.movementX = 'right') : e.movementX < 0 && (this.movementX = 'left');
    const colsRefs = Array.from(this.rowsRefs[0]?.children || []);
    const colsPositions = colsRefs.map(col =>
      this.movementX === 'right' ? col.offsetLeft + col.offsetWidth : col.offsetLeft
    );

    const dragPreviewWidth = this.colsWidth
      .slice(dragsIndex.start, dragsIndex.end + 1)
      .reduce((acc, curr) => acc + curr);
    const lastCol = colsRefs[colsRefs.length - 1];
    const maxLeft = lastCol.offsetLeft + lastCol.offsetWidth + 20 - dragPreviewWidth;
    const dropLeft = Math.min(e.pageX - dragPreviewWidth, maxLeft);
    colsPositions.forEach((pos, index) => {
      if (
        (this.movementX === 'right' && dropLeft + dragPreviewWidth > pos - 15) ||
        (this.movementX === 'left' && dropLeft > pos + 15)
      ) {
        this.colDropIndex = index + 1;
      }
    });
    this.highlightResizer(this.colDropIndex - 1, true);

    this.dragPreview.current.style.left = `${dropLeft}px`;
    this.dragPreview.current.style.top = '0';
    this.dragPreview.current.style.visibility = 'visible';
    this.dragPreview.current.style.height = `${this.tableRef.current.offsetHeight}px`;
    this.dragPreview.current.style.width = `${dragPreviewWidth}px`;
  };

  onRowDrag = (e, dragsIndex) => {
    e.movementY > 0 ? (this.movementY = 'down') : e.movementY < 0 && (this.movementY = 'up');
    const rowsPositions = Object.entries(this.rowsRefs).map(([, row]) =>
      this.movementY === 'down' ? row.offsetTop + row.offsetHeight : row.offsetTop
    );
    const dragPreviewHeight = this.rowsHeights
      .slice(dragsIndex.start, dragsIndex.end + 1)
      .reduce((acc, curr) => acc + curr);
    if (this.dragPadding) {
      this.dropTop += e.pageY - this.dragPadding;
      this.dragPadding = e.pageY;
    } else {
      this.dropTop = 0;
      if (dragsIndex.start > 0) {
        this.rowsHeights.slice(0, dragsIndex.start).forEach(height => (this.dropTop += height));
      }
      this.dragPadding = e.pageY;
    }

    rowsPositions.forEach((pos, index) => {
      if (
        (this.movementY === 'down' && this.dropTop + dragPreviewHeight > pos - 20) ||
        (this.movementY === 'up' && this.dropTop > pos + 20)
      ) {
        this.rowDropIndex = index + 1;
      } else if (this.dropTop <= 15) {
        this.rowDropIndex = 0;
      }
    });
    this.highlightResizer(this.rowDropIndex - 1);

    this.dragPreview.current.style.top = `${this.dropTop}px`;
    this.dragPreview.current.style.visibility = 'visible';
    this.dragPreview.current.style.left = '0';
    this.dragPreview.current.style.height = `${dragPreviewHeight}px`;
    this.dragPreview.current.style.width = `${this.tableRef.current.offsetWidth}px`;
  };

  setRowRef = (ref, i) => (this.rowsRefs[i] = ref);

  setEditorRef = (ref, i, j) => (this.innerEditorsRefs[`${i}-${j}`] = ref);

  onFocus = e => e.stopPropagation();

  render() {
    const { componentData, theme, t, isMobile, settings, blockProps } = this.props;
    const {
      selected,
      isEditingActive,
      disableSelectedStyle,
      highlightColResizer,
      isAllCellsSelected,
    } = this.state;
    this.table.updateComponentData(componentData);
    this.rowsHeights = Object.entries(this.rowsRefs).map(([, ref]) => ref?.offsetHeight);
    this.colsWidth = Array.from(this.rowsRefs[0]?.children || []).map(ref => ref?.offsetWidth);
    const isTableOnFocus = isPluginFocused(this.props.block, this.props.selection);
    const range = selected && getRange(selected);
    const isEditMode = !isMobile && isTableOnFocus;
    const rowNum = this.table.getRowNum();
    const colNum = this.table.getColNum();
    const disableNewCol = isCellsNumberInvalid(rowNum, colNum + 1);
    const disableNewRow = isCellsNumberInvalid(rowNum + 1, colNum);
    return (
      <div
        className={classNames(styles.tableEditorContainer, 'has-custom-focus', {
          [styles.editMode]: isEditMode,
          [styles.viewMode]: !isEditMode,
        })}
        data-hook="TableComponent"
        onFocus={this.onFocus}
        tabIndex="0"
        ref={this.tableContainer}
        onKeyDown={this.onKeyDown}
      >
        {!isMobile && (
          <TableToolbar
            ref={this.setToolbarRef}
            selected={selected}
            table={this.table}
            innerEditorsRefs={this.innerEditorsRefs}
            addCol={!disableNewCol && this.addCol}
            addRow={!disableNewRow && this.addRow}
            deleteColumn={this.deleteColumn}
            deleteRow={this.deleteRow}
            isEditingActive={isEditingActive}
            tableWidth={this.tableRef.current?.parentElement?.offsetWidth}
            getFirstCellRef={this.getFirstCellRef}
            t={t}
            theme={theme}
            isMobile={isMobile}
            settings={settings}
            selectRows={this.selectRows}
            selectCols={this.selectCols}
            deleteBlock={blockProps.deleteBlock}
            isAllCellsSelected={this.isAllCellsSelected(selected)}
            merge={this.merge}
            distributeRows={this.distributeRows}
            distributeColumns={this.distributeColumns}
          />
        )}
        {!isMobile && (
          <Rows
            rowDragProps={this.rowDragProps}
            activeDrag={
              this.state.isEditingActive
                ? []
                : this.table.getSelectedRows(range)?.map(i => parseInt(i))
            }
            isAllCellsSelected={isAllCellsSelected}
            size={this.tableRef.current?.offsetWidth}
            onResize={this.onResizeRow}
            highlightResizer={this.state.highlightRowResizer}
            onResizeStart={this.setSelected}
            isSelectAllActive={this.isAllCellsSelected(selected)}
            onSelectAllClick={this.toggleAllCellsSelection}
            rowNum={rowNum}
            isEditMode={isEditMode}
            rowsHeights={this.rowsHeights}
            rowsRefs={this.rowsRefs}
            rowsMaxContentHeight={
              this.innerEditorsRefs && this.table.getRowsMaxContentHeight(this.innerEditorsRefs)
            }
          />
        )}
        <div
          ref={this.tableRef}
          className={styles.tableWrapper}
          style={isTableOnFocus ? { zIndex: 2 } : {}}
        >
          <TableViewer
            table={this.table}
            renderInnerRCE={this.renderInnerRCE}
            onSelect={this.onSelect}
            theme={theme}
            setRowRef={this.setRowRef}
            setEditorRef={this.setEditorRef}
            toolbarRef={this.toolbarRef}
            setEditingActive={this.setEditingActive}
            selected={selected}
            tableWidth={this.tableRef.current?.offsetWidth}
            isMobile={isMobile}
            isEditMode={isEditMode}
            disableSelectedStyle={
              disableSelectedStyle ||
              this.table.getSelectedCols(range) ||
              this.table.getSelectedRows(range)
            }
            t={t}
            colDragProps={this.colDragProps}
            onResize={this.onResizeCol}
            onResizeStart={this.setSelected}
            highlightResizer={highlightColResizer}
            selectAll={isAllCellsSelected}
            tableHeight={this.tableRef.current?.offsetHeight}
            isEditingActive={this.state.isEditingActive}
            onClear={this.table.clearCells}
            setCellContent={this.setCellContent}
            onPaste={this.onPaste}
            tableOverflowWidth={
              this.tableRef.current?.offsetWidth - this.tableContainer.current?.offsetWidth
            }
          />
          <div className={styles.dragPreview} ref={this.dragPreview} />
        </div>
        {!isMobile && (
          <div className={styles.addCol}>
            <AddNewSection
              dataHook={'addCol'}
              onClick={this.addLastCol}
              shouldDisable={disableNewCol}
              t={t}
            />
          </div>
        )}
        {!isMobile && (
          <div className={styles.addRow}>
            <AddNewSection
              dataHook={'addRow'}
              onClick={this.addLastRow}
              shouldDisable={disableNewRow}
              t={t}
            />
          </div>
        )}
      </div>
    );
  }
}

TableComponent.propTypes = {
  blockProps: PropTypes.object.isRequired,
  block: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired,
  componentData: PropTypes.object.isRequired,
  renderInnerRCE: PropTypes.func,
  theme: PropTypes.object,
  selection: PropTypes.object.isRequired,
  t: PropTypes.func,
  isMobile: PropTypes.bool,
  settings: PropTypes.object,
  disableKeyboardEvents: PropTypes.func,
};

export { TableComponent as Component };
