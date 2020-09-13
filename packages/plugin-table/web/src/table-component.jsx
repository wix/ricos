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
import { getRowNum, getColNum, getCellContent, getRange, getRowsRange } from './tableUtils';
import AddNewSection from './components/AddNewSection';
import { isPluginFocused } from 'wix-rich-content-editor-common';
class TableComponent extends React.Component {
  constructor(props) {
    super(props);
    this.rowsRefs = [];
    this.table = new Table(props.componentData, this.updateComponentData1);
    this.onResize = {
      onResizeCol: this.onResizeCol,
      onResizeRow: this.onResizeRow,
    };
    this.state = {};
    this.innerRceAdditionalProps = { placeholder: '' };
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

  selectRow = dragSelection =>
    this.setState({
      selected: {
        start: { i: dragSelection.start, j: 0 },
        end: { i: dragSelection.end, j: getColNum(this.props.componentData) - 1 },
      },
    });

  selectCol = dragSelection =>
    this.setState({
      selected: {
        start: { i: 0, j: dragSelection.start },
        end: { i: getRowNum(this.props.componentData) - 1, j: dragSelection.end },
      },
    });

  onSelect = selected => this.setState({ selected });

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
    this.setState({
      selected: {
        ...selected,
        end: { i: selected.start.i + copiedRowsNum - 1, j: selected.start.j + copiedColsNum - 1 },
      },
    });
  };

  setAllCellsSelected = () =>
    this.setState({
      selected: {
        start: { i: 0, j: 0 },
        end: {
          i: getRowNum(this.props.componentData) - 1,
          j: getColNum(this.props.componentData) - 1,
        },
      },
    });

  handleClickSelectAll = () => {
    const { clickOnSelectAll } = this.state;
    if (clickOnSelectAll) {
      this.resetSelectAll();
      this.setState({ selected: null });
    } else {
      this.setAllCellsSelected();
    }
    this.setState({ clickOnSelectAll: !clickOnSelectAll });
  };

  resetSelectAll = () => {
    this.setState({ clickOnSelectAll: false });
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
      getRowsRange({
        start: { i: index, j: 0 },
        end: { i: index, j: 0 },
      }),
      height
    );

  setTableRef = ref => (this.tableRef = ref);

  handleCopy = ({ end, start }) => this.setState({ copiedCellsRange: getRange({ start, end }) });

  highlightResizer = (i, isCol) => {
    isCol ? this.setState({ highlightColResizer: i }) : this.setState({ highlightRowResizer: i });
  };

  onColDragEnd = (e, startIndex) => {
    const colsPositions = Array.from(this.rowsRefs[0]?.children || []).map(col => col.offsetLeft);
    const dropLeft = e.target.parentElement.offsetLeft;
    let dropIndex = 0;
    colsPositions.forEach((left, index) => left < dropLeft && (dropIndex = index));
    this.table.reorderColumns(startIndex, dropIndex);
    this.setState({ highlightColResizer: false });
    this.resetDrag();
  };

  onRowDragEnd = (e, startIndex) => {
    const rowsPositions = Array.from(this.rowsRefs || []).map(row => row.offsetTop);
    const dropTop = e.target.parentElement.offsetTop;
    let dropIndex = 0;
    rowsPositions.forEach((top, index) => top < dropTop && (dropIndex = index));
    this.table.reorderRows(startIndex, dropIndex);
    this.dropTop = null;
    this.dragPadding = null;
    this.setState({ highlightRowResizer: false });
    this.resetDrag();
  };

  resetDrag = () => {
    this.dragPreview.style.visibility = 'hidden';
    this.setState({ selected: null });
  };

  addLastRow = () => this.table.addRow(getRowNum(this.props.componentData));

  addLastCol = () => this.table.addColumn(getColNum(this.props.componentData));

  onColDrag = (e, i) => {
    const colsPositions = Array.from(this.rowsRefs[0]?.children || []).map(col => col.offsetLeft);
    const dropLeft = e.pageX - this.colsWidth[i] + 20;
    colsPositions.forEach(
      (left, index) =>
        dropLeft <= left + 5 && dropLeft >= left - 5 && this.highlightResizer(index, true)
    );
    this.dragPreview.style.left = `${dropLeft}px`;
    this.dragPreview.style.top = '0';
    this.dragPreview.style.visibility = 'visible';
    this.dragPreview.style.height = `${this.tableRef.offsetHeight}px`;
    this.dragPreview.style.width = `${this.colsWidth[i]}px`;
  };

  onRowDrag = (e, i) => {
    const rowsPositions = Array.from(this.rowsRefs || []).map(row => row.offsetTop);
    if (this.dragPadding) {
      this.dropTop += e.pageY - this.dragPadding;
      this.dragPadding = e.pageY;
    } else {
      this.dropTop = 0;
      if (i > 0) {
        this.rowsHeights.slice(0, i).forEach(height => (this.dropTop += height));
      }
      this.dragPadding = e.pageY;
    }
    rowsPositions.forEach((top, index) => {
      this.dropTop <= top + 5 && this.dropTop >= top - 5 && this.highlightResizer(index);
    });
    this.dragPreview.style.top = `${this.dropTop}px`;
    this.dragPreview.style.visibility = 'visible';
    this.dragPreview.style.left = '0';
    this.dragPreview.style.height = `${this.rowsHeights[i]}px`;
    this.dragPreview.style.width = `${this.tableRef.offsetWidth}px`;
  };

  setRowRef = (ref, i) => (this.rowsRefs[i] = ref);

  setDragPreviewRef = ref => (this.dragPreview = ref);

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
        />
      </div>
    );
  };

  render() {
    const { componentData } = this.props;
    const { selected, clickOnSelectAll } = this.state;
    const rowNum = getRowNum(componentData);
    const colNum = getColNum(componentData);
    this.table = new Table(componentData, this.updateComponentData1);
    this.rowsHeights = this.rowsRefs.map(ref => ref.clientHeight);
    this.colsWidth = Array.from(this.rowsRefs[0]?.children || []).map(ref => ref?.clientWidth);
    const isTableOnFocus = isPluginFocused(this.props.block, this.props.selection);
    const editStyle = { visibility: isTableOnFocus ? 'visible' : 'hidden' };
    return (
      <div className={styles.tableEditorContainer}>
        <CellToolbar selected={selected} table={this.table} tableRef={this.tableRef} />
        <SelectTable
          onClickOutside={this.resetSelectAll}
          isActive={clickOnSelectAll}
          onClick={this.handleClickSelectAll}
          style={editStyle}
        />
        <div className={styles.colsController} style={editStyle}>
          <DragAndDropSection
            cellsNum={colNum}
            onDragClick={this.selectCol}
            onPlusClick={this.table.addColumn}
            isCol
            selectAll={clickOnSelectAll}
            highlightResizer={this.highlightResizer}
            onDragEnd={this.onColDragEnd}
            onDrag={this.onColDrag}
            sizes={this.colsWidth}
          />
        </div>
        <div className={styles.rowsController} style={editStyle}>
          <DragAndDropSection
            cellsNum={rowNum}
            onDragClick={this.selectRow}
            onPlusClick={this.table.addRow}
            selectAll={clickOnSelectAll}
            highlightResizer={this.highlightResizer}
            onDragEnd={this.onRowDragEnd}
            onDrag={this.onRowDrag}
            sizes={this.rowsHeights}
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
