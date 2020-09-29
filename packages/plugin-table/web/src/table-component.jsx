/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';
import TableViewer from './table-viewer';
import styles from '../statics/styles/table-component.scss';
import DragAndDropSection from './components/DragAndDropSection';
import CellToolbar from './components/CellToolbar';
import SelectTable from './components/SelectTable';
import Table from './domain/table';
import { getRowNum, getColNum, getCellContent, getRange } from './tableUtils';
import AddNewSection from './components/AddNewSection';
import { isPluginFocused, TOOLBARS } from 'wix-rich-content-editor-common';
import { CELL_MIN_WIDTH } from './consts';
import { isEmpty } from 'lodash';
class TableComponent extends React.Component {
  constructor(props) {
    super(props);
    this.rowsRefs = [];
    this.table = new Table(props.componentData, this.updateComponentData1);
    this.onResize = {
      onResizeCol: this.onResizeCol,
      onResizeRow: this.onResizeRow,
    };
    this.state = {
      isEditingActive: false,
      selected: {},
    };
    this.innerRceAdditionalProps = { placeholder: '' };
    this.innerEditorsRefs = {};
  }

  componentWillReceiveProps(nextProps) {
    if (
      !isPluginFocused(nextProps.block, nextProps.selection) &&
      isPluginFocused(this.props.block, this.props.selection)
    ) {
      this.setSelected();
    }
  }

  renderInnerRCE = (i, j) => {
    const { renderInnerRCE, componentData } = this.props;
    const contentState = getCellContent(componentData, i, j);
    return renderInnerRCE({
      contentState,
      callback: newContentState => this.table.updateCellContent(i, j, newContentState),
      renderedIn: 'table',
      additionalProps: this.innerRceAdditionalProps,
    });
  };

  selectRows = indexes => {
    const selected = indexes
      ? {
          start: { i: indexes.start, j: 0 },
          end: { i: indexes.end, j: getColNum(this.props.componentData) - 1 },
        }
      : {};
    this.setSelected({ selected });
  };

  selectCols = indexes => {
    const selected = indexes
      ? {
          start: { i: 0, j: indexes.start },
          end: { i: getRowNum(this.props.componentData) - 1, j: indexes.end },
        }
      : {};
    this.setSelected({ selected });
  };
  setEditingActive = isEditingActive => {
    this.setState({ isEditingActive });
  };

  getCellToolbarProps = (i, j) => {
    return this.innerEditorsRefs[`${i}-${j}`].getToolbarProps(TOOLBARS.FORMATTING);
  };

  isCellEmpty = (i, j) => {
    const { componentData } = this.props;
    return getCellContent(componentData, i, j).blocks[0].text === '';
  };

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

  setSelected = obj => {
    if (obj) {
      const { selected } = obj;
      this.setState({ selected });
      this.setToolbarProps(selected);
      selected && this.isAllCellsSelected(selected) && this.setState({ isAllCellsSelected: true });
    } else {
      this.setState({ selected: {} });
      this.setToolbarProps();
    }
  };

  isAllCellsSelected = ({ start, end }) =>
    start &&
    end &&
    Math.min(start.i, end.i) === 0 &&
    Math.min(start.j, end.j) === 0 &&
    Math.max(start.i, end.i) === getRowNum(this.props.componentData) - 1 &&
    Math.max(start.j, end.j) === getColNum(this.props.componentData) - 1;

  onSelect = selected => this.setSelected({ selected });

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

  handleTableClipboardEvent = e => {
    const { selected, copiedCellsRange } = this.state;
    if (selected) {
      e.stopPropagation();
      if (e.key === 'Backspace') {
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
      selected: {
        ...selected,
        end: { i: selected.start.i + copiedRowsNum - 1, j: selected.start.j + copiedColsNum - 1 },
      },
    });
  };

  setAllCellsSelected = () =>
    this.setSelected({
      selected: {
        start: { i: 0, j: 0 },
        end: {
          i: getRowNum(this.props.componentData) - 1,
          j: getColNum(this.props.componentData) - 1,
        },
      },
    });

  handleClickSelectAll = () => {
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

  onResizeCol = (index, width) =>
    this.table.setColumnWidth(
      getRange({
        start: { i: 0, j: index },
        end: { i: getRowNum(this.props.componentData) - 1, j: index },
      }),
      width
    );

  onResizeRow = (index, height) =>
    this.table.setRowHeight(
      getRange({
        start: { i: index, j: 0 },
        end: { i: index, j: 0 },
      }),
      height
    );

  setTableRef = ref => (this.tableRef = ref);
  setToolbarRef = ref => (this.toolbarRef = ref);

  handleCopy = ({ end, start }) => this.setState({ copiedCellsRange: getRange({ start, end }) });

  highlightResizer = (i, isCol) => {
    isCol ? this.setState({ highlightColResizer: i }) : this.setState({ highlightRowResizer: i });
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
    this.dragPreview && (this.dragPreview.style.visibility = 'hidden');
    this.setSelected();
  };

  addRow = i => {
    this.table.addRow(i);
    this.setSelected();
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
      this.setSelected();
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

  addLastRow = () => this.addRow(getRowNum(this.props.componentData));

  addLastCol = () => this.addCol(getColNum(this.props.componentData));

  onColDrag = (e, dragsIndex) => {
    e.movementX > 0 ? (this.movementX = 'right') : e.movementX < 0 && (this.movementX = 'left');
    const colsRefs = this.rowsRefs[0]?.children || [];
    const colsPositions = Array.from(colsRefs).map(col =>
      this.movementX === 'right' ? col.offsetLeft + col.offsetWidth : col.offsetLeft
    );

    const dragPreviewWidth = this.colsWidth
      .slice(dragsIndex.start, dragsIndex.end + 1)
      .reduce((acc, curr) => acc + curr);
    const leftEdge =
      colsRefs[colsRefs.length - 1].offsetLeft +
      this.colsWidth[this.colsWidth.length - 1] -
      dragPreviewWidth;
    const leftPosition = e.pageX - dragPreviewWidth;
    this.dropLeft =
      leftPosition < -20 ? -20 : leftPosition > leftEdge + 20 ? leftEdge + 20 : leftPosition;
    colsPositions.forEach((pos, index) => {
      if (
        (this.movementX === 'right' && this.dropLeft + dragPreviewWidth > pos + 30) ||
        (this.movementX === 'left' && this.dropLeft > pos - 30)
      ) {
        this.highlightResizer(index, true);
        this.colDropIndex = index + 1;
      }
    });

    this.dragPreview.style.left = `${this.dropLeft}px`;
    this.dragPreview.style.top = '0';
    this.dragPreview.style.visibility = 'visible';
    this.dragPreview.style.height = `${this.tableRef.offsetHeight}px`;
    this.dragPreview.style.width = `${dragPreviewWidth}px`;
  };

  onRowDrag = (e, dragsIndex) => {
    e.movementY > 0 ? (this.movementY = 'down') : e.movementY < 0 && (this.movementY = 'up');
    const rowsPositions = Array.from(this.rowsRefs || []).map(row =>
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
        (this.movementY === 'down' && this.dropTop + dragPreviewHeight > pos + 20) ||
        (this.movementY === 'up' && this.dropTop > pos - 20)
      ) {
        this.highlightResizer(index);
        this.rowDropIndex = index + 1;
      }
    });

    this.dragPreview.style.top = `${this.dropTop}px`;
    this.dragPreview.style.visibility = 'visible';
    this.dragPreview.style.left = '0';
    this.dragPreview.style.height = `${dragPreviewHeight}px`;
    this.dragPreview.style.width = `${this.tableRef.offsetWidth}px`;
  };

  setRowRef = (ref, i) => (this.rowsRefs[i] = ref);

  setDragPreviewRef = ref => (this.dragPreview = ref);

  setEditorRef = (ref, i, j) => (this.innerEditorsRefs[`${i}-${j}`] = ref);

  tableViewerRenderer = isTableOnFocus => {
    const { componentData, theme } = this.props;
    const { selected, highlightColResizer, highlightRowResizer } = this.state;
    return (
      <div className={styles.rceTable} onKeyDown={this.handleTableClipboardEvent}>
        <TableViewer
          componentData={componentData}
          renderInnerRCE={this.renderInnerRCE}
          selected={isTableOnFocus && selected}
          onSelect={this.onSelect}
          theme={theme}
          onResize={isTableOnFocus && this.onResize}
          setTableRef={this.setTableRef}
          tableRef={this.tableRef}
          handleCopy={this.handleCopy}
          highlightColResizer={highlightColResizer}
          highlightRowResizer={highlightRowResizer}
          setRowRef={this.setRowRef}
          setEditorRef={this.setEditorRef}
          toolbarRef={this.toolbarRef}
          setEditingActive={this.setEditingActive}
        />
      </div>
    );
  };

  render() {
    const { componentData } = this.props;
    const { selected, isAllCellsSelected, isEditingActive } = this.state;
    const rowNum = getRowNum(componentData);
    const colNum = getColNum(componentData);
    this.table = new Table(componentData, this.updateComponentData1);
    this.rowsHeights = this.rowsRefs.map(ref => ref.clientHeight);
    this.colsWidth = Array.from(this.rowsRefs[0]?.children || []).map(ref => ref?.clientWidth);
    const isTableOnFocus = isPluginFocused(this.props.block, this.props.selection);
    const editStyle = { visibility: isTableOnFocus ? 'visible' : 'hidden' };
    const range = selected && getRange(selected);
    return (
      <div className={styles.tableEditorContainer}>
        <CellToolbar
          ref={this.setToolbarRef}
          selected={selected}
          table={this.table}
          innerEditorsRefs={this.innerEditorsRefs}
          addCol={this.addCol}
          addRow={this.addRow}
          isEditingActive={isEditingActive}
          tableWidth={this.tableRef && this.tableRef.offsetWidth}
          getFirstCellRef={this.getFirstCellRef}
        />
        <SelectTable
          onClickOutside={this.handleClickOutsideSelectAll}
          isActive={isAllCellsSelected}
          onClick={this.handleClickSelectAll}
          style={editStyle}
        />
        <div className={styles.colsController} style={editStyle}>
          <DragAndDropSection
            cellsNum={colNum}
            onDragClick={this.selectCols}
            onPlusClick={this.addCol}
            isCol
            selectAll={isAllCellsSelected}
            highlightResizer={this.highlightResizer}
            onDragEnd={this.onColDragEnd}
            onDrag={this.onColDrag}
            sizes={this.colsWidth}
            activeDrag={this.table.getSelectedCols(range)?.map(i => parseInt(i))}
          />
        </div>
        <div className={styles.rowsController} style={editStyle}>
          <DragAndDropSection
            cellsNum={rowNum}
            onDragClick={this.selectRows}
            onPlusClick={this.addRow}
            selectAll={isAllCellsSelected}
            highlightResizer={this.highlightResizer}
            onDragEnd={this.onRowDragEnd}
            onDrag={this.onRowDrag}
            sizes={this.rowsHeights}
            activeDrag={this.table.getSelectedRows(range)?.map(i => parseInt(i))}
          />
        </div>
        <div className={styles.tableWrapper} style={isTableOnFocus ? { zIndex: 1 } : {}}>
          {this.tableViewerRenderer(isTableOnFocus)}
          <div className={styles.dragPreview} ref={this.setDragPreviewRef} />
        </div>
        <AddNewSection className={styles.addCol} onClick={this.addLastCol} style={editStyle} />
        <AddNewSection className={styles.addRow} onClick={this.addLastRow} style={editStyle} />
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
};

export { TableComponent as Component };
