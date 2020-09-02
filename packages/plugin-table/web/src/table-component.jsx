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
import {
  createEmptyCellContent,
  getRowNum,
  getColNum,
  getCellContent,
  getRange,
  getRowsRange,
} from './tableUtils';
import AddNewSection from './components/AddNewSection';
import { isPluginFocused } from 'wix-rich-content-editor-common';
class TableComponent extends React.Component {
  constructor(props) {
    super(props);
    this.rowsRefs = [];
    this.dragPreviewStyles = {};
    this.table = new Table(props.componentData, this.updateComponentData1);
  }
  renderInnerRCE = (i, j) => {
    const { renderInnerRCE, componentData } = this.props;
    let contentState = getCellContent(componentData, i, j);
    if (!contentState) {
      contentState = createEmptyCellContent();
      this.table.updateCellContent(i, j, contentState);
    }
    const additionalProps = { placeholder: '' };
    return renderInnerRCE({
      contentState,
      callback: newContentState => this.table.updateCellContent(i, j, newContentState),
      renderedIn: 'table',
      additionalProps,
    });
  };

  selectRow = i =>
    this.setState({
      selected: { start: { i, j: 0 }, end: { i, j: getColNum(this.props.componentData) - 1 } },
    });

  selectCol = j =>
    this.setState({
      selected: { start: { i: 0, j }, end: { i: getRowNum(this.props.componentData) - 1, j } },
    });

  onSelect = selected => this.setState({ selected });

  handleSelectAllClipboardEvent = e => {
    if (e.ctrlKey || e.metaKey) {
      if (e.key === 'a') {
        e.preventDefault();
        this.setAllCellsSelected();
      }
    }
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

  selectAll = () => {
    this.setAllCellsSelected();
    this.setState({ clickOnSelectAll: true });
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

  onCellsChanged = changes => {
    const { copiedCellsRange } = this.state;
    const cellsToDelete = [];
    changes.forEach(data => {
      if (data.value === '') {
        cellsToDelete.push({ i: data.row, j: data.col });
      } else if (copiedCellsRange) {
        this.table.pasteCells(copiedCellsRange, data.row, data.col);
      }
    });
    cellsToDelete.length > 0 && this.table.clearRange(cellsToDelete);
  };

  highlightResizer = (i, isCol) => {
    isCol ? this.setState({ highlightColResizer: i }) : this.setState({ highlightRowResizer: i });
  };

  onColDragEnd = (from, to) => {
    this.table.reorderColumns(from, to);
    this.resetDrag();
  };

  onRowDragEnd = (from, to) => {
    this.table.reorderRows(from, to);
    this.resetDrag();
  };

  resetDrag = () => {
    this.dragPreviewStyles = {};
    this.setState({ selected: {} });
  };

  addLastRow = () => this.table.addRow(getRowNum(this.props.componentData));

  addLastCol = () => this.table.addColumn(getColNum(this.props.componentData));

  onColDrag = i =>
    (this.dragPreviewStyles = {
      zIndex: 1,
      height: this.tableRef.offsetHeight,
      width: this.colsWidth[i],
    });

  onRowDrag = i =>
    (this.dragPreviewStyles = {
      zIndex: 1,
      height: this.rowsHeights[i],
      width: this.tableRef.offsetWidth,
    });

  setRowRef = (ref, i) => (this.rowsRefs[i] = ref);

  onDragMove = e =>
    (this.dragPreviewStyles = { ...this.dragPreviewStyles, left: e.pageX, top: e.pageY });

  tableViewerRenderer = isTableOnFocus => {
    const { componentData, theme } = this.props;
    const { selected, highlightColResizer, highlightRowResizer } = this.state || {};
    const onResize = isTableOnFocus && {
      onResizeCol: this.onResizeCol,
      onResizeRow: this.onResizeRow,
    };
    return (
      <div
        className={styles.rceTable}
        onKeyDown={this.handleSelectAllClipboardEvent}
        style={isTableOnFocus ? { zIndex: 1 } : {}}
      >
        <TableViewer
          componentData={componentData}
          renderInnerRCE={this.renderInnerRCE}
          selected={isTableOnFocus ? selected : {}}
          onSelect={this.onSelect}
          theme={theme}
          onResize={onResize}
          setTableRef={this.setTableRef}
          tableRef={this.tableRef}
          handleCopy={this.handleCopy}
          onCellsChanged={this.onCellsChanged}
          highlightColResizer={highlightColResizer}
          highlightRowResizer={highlightRowResizer}
          setRowRef={this.setRowRef}
        />
      </div>
    );
  };

  render() {
    const { componentData } = this.props;
    const { selected, clickOnSelectAll } = this.state || {};
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
          onClick={this.selectAll}
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
            onDragMove={this.onDragMove}
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
            onDragMove={this.onDragMove}
          />
        </div>
        {this.tableViewerRenderer(isTableOnFocus)}
        <AddNewSection className={styles.addCol} onClick={this.addLastCol} style={editStyle} />
        <AddNewSection className={styles.addRow} onClick={this.addLastRow} style={editStyle} />
        <div className={styles.dragPreview} style={this.dragPreviewStyles} />
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
