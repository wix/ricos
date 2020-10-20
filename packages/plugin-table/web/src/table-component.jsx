/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { createRef } from 'react';
import PropTypes from 'prop-types';
import TableViewer from './table-viewer';
import styles from '../statics/styles/table-component.scss';
import Table from './domain/table';
import { getRange } from './tableUtils';
import { AddNewSection, TableToolbar, Columns, Rows } from './components';
import { isPluginFocused, TOOLBARS } from 'wix-rich-content-editor-common';
import { CELL_MIN_WIDTH } from './consts';
import { isEmpty } from 'lodash';
import classNames from 'classnames';

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
    this.table = new Table(props.componentData, this.updateComponentData1);
    this.tableRef = createRef();
    this.dragPreview = createRef();
  }

  componentWillReceiveProps(nextProps) {
    if (
      !isPluginFocused(nextProps.block, nextProps.selection) &&
      isPluginFocused(this.props.block, this.props.selection)
    ) {
      this.setSelected();
    }
  }

  // disableKeyboardEvents = () => {
  //   this.props.disableKeyboardEvents(false);
  // };
  componentDidMount() {
    document.addEventListener('keydown', this.handleTableClipboardEvent);
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleTableClipboardEvent);
  }

  renderInnerRCE = (i, j) => {
    const contentState = this.table.getCellContent(i, j);
    return this.props.renderInnerRCE({
      contentState,
      callback: newContentState => this.table.updateCellContent(i, j, newContentState),
      renderedIn: 'table',
      additionalProps: this.innerRceAdditionalProps,
      toolbarsToIgnore: ['InlineTextToolbar'],
    });
  };

  selectRows = rowsIndexes => {
    const selected = rowsIndexes ? this.table.getRowsSelection(rowsIndexes) : {};
    this.setSelected(selected);
  };

  selectCols = colsIndexes => {
    const selected = colsIndexes ? this.table.getColsSelection(colsIndexes) : {};
    this.setSelected(selected);
  };

  setEditingActive = isEditingActive => this.setState({ isEditingActive });

  getCellToolbarProps = (i, j) =>
    this.innerEditorsRefs[`${i}-${j}`]?.getToolbarProps(TOOLBARS.FORMATTING);

  isCellEmpty = (i, j) => this.table.getCellContent(i, j).blocks[0].text === '';

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
      range.forEach(r => {
        toolbarPropsBeforeOrganize.push({
          toolbarProps: this.getCellToolbarProps(r.i, r.j),
          indexes: { i: r.i, j: r.j },
        });
      });
      const toolbarProps = this.handleFirstCellEmpty(toolbarPropsBeforeOrganize);
      this.toolbarRef?.setToolbarProps(toolbarProps);
    } else {
      this.toolbarRef?.setToolbarProps();
    }
  };

  setSelected = selected => {
    const isAllCellsSelected = this.isAllCellsSelected(selected);
    this.setState(
      { selected, isAllCellsSelected, highlightColResizer: false, highlightRowResizer: false },
      () => this.setToolbarProps(selected)
    );
  };

  isAllCellsSelected = selected =>
    selected && this.table.isAllCellsSelected(selected.start, selected.end);

  onSelect = selected => this.setSelected(selected);

  getFirstCellRef = () => {
    const { selected } = this.state;
    let firstSelectedCellRef;
    if (!isEmpty(selected)) {
      const firstSelectedCell = getRange(selected)[0];
      const firstSelectedRowRef = this.rowsRefs[firstSelectedCell.i];
      Array.from(firstSelectedRowRef?.children || []).forEach((col, i) => {
        if (i - 1 === firstSelectedCell.j) {
          firstSelectedCellRef = col;
        }
      });
    }
    return firstSelectedCellRef;
  };

  handleTableClipboardEvent = e => {
    const { selected, copiedCellsRange, isEditingActive } = this.state;
    if (isPluginFocused(this.props.block, this.props.selection) && selected && !isEditingActive) {
      e.stopPropagation();
      if (e.key === 'Backspace') {
        e.preventDefault();
        this.table.clearRange(getRange(selected));
      } else if (e.key === 'a' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        this.setAllCellsSelected();
      } else if (copiedCellsRange && e.key === 'v' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        this.table.pasteCells(copiedCellsRange, selected.start.i, selected.start.j);
        this.setSelectionOnPastedCells();
      }
    }
  };

  setSelectionOnPastedCells = () => {
    const { selected, copiedCellsRange } = this.state;
    const { i: startI, j: startJ } = copiedCellsRange[0];
    const { i: endI, j: endJ } = copiedCellsRange[copiedCellsRange.length - 1];
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

  updateComponentData1 = data => {
    const { setData } = this.props.blockProps;
    setData(data);
    this.props.store.set('componentData', { ...data }, this.props.block.getKey());
  };

  onResizeCol = (i, width) =>
    this.table.setColumnWidth(getRange(this.table.getColsSelection({ start: i, end: i })), width);

  onResizeRow = (i, height) =>
    this.table.setRowHeight(getRange(this.table.getRowsSelection({ start: i, end: i })), height);

  setToolbarRef = ref => (this.toolbarRef = ref);

  handleCopy = ({ end, start }) => this.setState({ copiedCellsRange: getRange({ start, end }) });

  highlightResizer = (i, isCol) => {
    if (isCol && this.state.highlightColResizer !== i) {
      this.setState({ highlightColResizer: i });
    } else if (!isCol && this.state.highlightRowResizer !== i) {
      this.setState({ highlightRowResizer: i });
    }
  };

  isPositionInBoundaries = (boundary, pos) => boundary - 10 < pos && pos < boundary + 10;

  onColDragEnd = (e, dragsIndex) => {
    this.table.reorderColumns(dragsIndex, this.colDropIndex);
    this.setState({ highlightColResizer: false });
    this.resetDrag();
    this.dropLeft = null;
    this.colDropIndex = null;
  };

  onRowDragEnd = (e, dragsIndex) => {
    this.table.reorderRows(dragsIndex, this.rowDropIndex);
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
    this.table.addRow(i);
    this.selectRows({ start: i, end: i });
  };

  canAddNewCol = () => {
    let availability = 0;
    Array.from(this.rowsRefs[0]?.children || []).forEach(col => {
      availability += col.offsetWidth - CELL_MIN_WIDTH;
    });
    return availability >= CELL_MIN_WIDTH;
  };

  addCol = i => {
    if (this.canAddNewCol()) {
      this.table.addColumn(i);
      this.selectCols({ start: i, end: i });
      const columns = this.props.componentData.config.rows['0'].columns;
      let shouldUpdateComponentData = false;
      Array.from(this.rowsRefs[0]?.children || []).forEach((col, i) => {
        if (col.offsetWidth < CELL_MIN_WIDTH) {
          columns[i].style = { ...columns[i].style, width: CELL_MIN_WIDTH };
          shouldUpdateComponentData = true;
        }
      });
      shouldUpdateComponentData && this.updateComponentData1(this.props.componentData);
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
    const colsRefs = this.rowsRefs[0]?.children || [];
    const colsPositions = Array.from(colsRefs).map(col =>
      this.movementX === 'right' ? col.offsetLeft + col.offsetWidth : col.offsetLeft
    );

    const dragPreviewWidth = this.colsWidth
      .slice(dragsIndex.start, dragsIndex.end + 1)
      .reduce((acc, curr) => acc + curr);
    this.dropLeft = e.pageX - dragPreviewWidth;
    colsPositions.forEach((pos, index) => {
      if (
        (this.movementX === 'right' && this.dropLeft + dragPreviewWidth > pos - 30) ||
        (this.movementX === 'left' && this.dropLeft > pos + 30)
      ) {
        this.colDropIndex = index + 1;
      }
    });
    this.highlightResizer(this.colDropIndex - 1, true);

    this.dragPreview.current.style.left = `${this.dropLeft}px`;
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

  getRows = range => {
    const rowDragProps = {
      onDragClick: this.selectRows,
      onPlusClick: this.addRow,
      highlightResizer: this.highlightResizer,
      onDragEnd: this.onRowDragEnd,
      onDrag: this.onRowDrag,
      cellsNum: this.table.getRowNum(),
    };
    const resizeProps = {
      size: this.tableRef.current?.offsetWidth - 20,
      onResize: this.onResizeRow,
      highlightResizer: this.state.highlightRowResizer,
    };
    return (
      <Rows
        rowDragProps={rowDragProps}
        resizeProps={resizeProps}
        activeDrag={this.table.getSelectedRows(range)?.map(i => parseInt(i))}
        selectAll={this.state.isAllCellsSelected}
      />
    );
  };

  getColumns = range => {
    const colDragProps = {
      onDragClick: this.selectCols,
      onPlusClick: this.addCol,
      highlightResizer: this.highlightResizer,
      onDragEnd: this.onColDragEnd,
      onDrag: this.onColDrag,
    };

    const resizeProps = {
      size: this.tableRef.current?.offsetHeight - 20,
      onResize: this.onResizeCol,
      highlightResizer: this.state.highlightColResizer,
    };
    return (
      <Columns
        isAllCellsSelected={this.state.isAllCellsSelected}
        toggleAllCellsSelection={this.toggleAllCellsSelection}
        colDragProps={colDragProps}
        colNum={this.table.getColNum()}
        resizeProps={resizeProps}
        activeDrag={this.table.getSelectedCols(range)?.map(i => parseInt(i))}
        selectAll={this.state.isAllCellsSelected}
      />
    );
  };

  render() {
    const { componentData, theme, t, isMobile, settings } = this.props;
    const { selected, isEditingActive } = this.state;
    this.table.updateComponentData(componentData);
    this.rowsHeights = Object.entries(this.rowsRefs).map(([, ref]) => ref?.offsetHeight);
    this.colsWidth = Array.from(this.rowsRefs[0]?.children || [])
      .map(ref => ref?.offsetWidth)
      .slice(1);
    const isTableOnFocus = isPluginFocused(this.props.block, this.props.selection);
    const range = selected && getRange(selected);
    const tableEditingProps = isTableOnFocus && {
      columns: this.getColumns(range),
      rows: this.getRows(range),
      selected,
    };

    return (
      <div
        className={classNames(styles.tableEditorContainer, {
          [styles.editMode]: isTableOnFocus,
          [styles.viewMode]: !isTableOnFocus,
          [styles.disableSelection]: !isEditingActive,
        })}
        data-hook="TableComponent"
      >
        <TableToolbar
          ref={this.setToolbarRef}
          selected={selected}
          table={this.table}
          innerEditorsRefs={this.innerEditorsRefs}
          addCol={this.addCol}
          addRow={this.addRow}
          deleteColumn={this.deleteColumn}
          deleteRow={this.deleteRow}
          isEditingActive={isEditingActive}
          tableWidth={this.tableRef.current?.offsetWidth}
          getFirstCellRef={this.getFirstCellRef}
          t={t}
          isMobile={isMobile}
          settings={settings}
        />
        <div
          ref={this.tableRef}
          className={styles.tableWrapper}
          style={isTableOnFocus ? { zIndex: 1 } : {}}
        >
          <TableViewer
            table={this.table}
            renderInnerRCE={this.renderInnerRCE}
            onSelect={this.onSelect}
            theme={theme}
            handleCopy={this.handleCopy}
            setRowRef={this.setRowRef}
            setEditorRef={this.setEditorRef}
            toolbarRef={this.toolbarRef}
            setEditingActive={this.setEditingActive}
            updateCellContent={this.table.updateCellContent}
            tableEditingProps={tableEditingProps}
            tableWidth={this.tableRef.current?.offsetWidth}
          />
          <div className={styles.dragPreview} ref={this.dragPreview} />
        </div>
        <AddNewSection className={styles.addCol} onClick={this.addLastCol} />
        <AddNewSection className={styles.addRow} onClick={this.addLastRow} />
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
  disableKeyboardEvents: PropTypes.func,
  t: PropTypes.func,
  isMobile: PropTypes.bool,
  settings: PropTypes.object,
};

export { TableComponent as Component };
