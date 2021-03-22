import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DataSheet from 'wix-react-datasheet/lib';
import { CellRenderer, TableRenderer, RowRenderer } from './components';
import styles from '../statics/styles/table-viewer.scss';
import { TableDataUtil } from './domain/tableDataUtil';
import classNames from 'classnames';
import { TABLE_TYPE } from './types';

class TableViewer extends Component {
  constructor(props) {
    super(props);
    this.table = this.props.table || new TableDataUtil(props.componentData);
    this.state = {};
  }

  componentDidMount() {
    this.tableViewerRef.children[0].classList.add('has-custom-focus');
  }

  cellCreator = (i, j) => ({
    key: `${i}-${j}`,
    component: this.renderCell(i, j),
    forceComponent: true,
    disableUpdatedFlag: true,
  });

  renderCell = (i, j) => {
    const { renderInnerRCE, innerRCV } = this.props;
    return renderInnerRCE
      ? renderInnerRCE(i, j)
      : innerRCV({ contentState: this.table.getCellContent(i, j), renderedIn: TABLE_TYPE });
  };

  createRow = (i, columnsNumber) =>
    [...Array(columnsNumber).fill(0)].map((cell, j) => this.cellCreator(i, j));

  sheetRenderer = props => {
    return (
      <TableRenderer
        {...props}
        table={this.table}
        tableRef={this.tableViewerRef}
        colDragProps={this.props.colDragProps}
        onResize={this.props.onResize}
        onResizeStart={this.props.onResizeStart}
        highlightResizer={this.props.highlightResizer}
        selectAll={this.props.selectAll}
        tableHeight={this.props.tableHeight}
        selected={this.props.selected}
        isEditMode={this.props.isEditMode}
        isEditingActive={this.props.isEditingActive}
        tableOverflowWidth={this.props.tableOverflowWidth}
      />
    );
  };

  rowRenderer = props => (
    <RowRenderer
      {...props}
      getRowHeight={this.table.getRowHeight}
      setRowRef={this.props.setRowRef}
      rowsToUpdate={this.props.rowsToUpdate}
    />
  );

  setCellRef = ref => (this.cellRef = ref);

  setTableViewerRef = ref => {
    this.tableViewerRef = ref;
    if (!this.state.isTableRefSet) {
      this.setState({ isTableRefSet: true });
    }
  };

  cellRenderer = props => {
    const {
      setEditorRef,
      toolbarRef,
      setEditingActive,
      tableWidth,
      isMobile,
      selected = {},
      disableSelectedStyle,
      t,
      selectCellContent,
    } = this.props;
    return (
      <CellRenderer
        {...props}
        ref={this.setCellRef}
        table={this.table}
        setEditorRef={setEditorRef}
        toolbarRef={toolbarRef}
        selectedCells={selected}
        setEditingActive={setEditingActive}
        tableWidth={tableWidth}
        isMobile={isMobile}
        disableSelectedStyle={disableSelectedStyle}
        t={t}
        selectCellContent={selectCellContent}
      />
    );
  };

  valueRenderer = cell => cell.component;

  render() {
    const { onSelect, selected, isEditMode, setCellContent, onClear, onPaste } = this.props;
    const rowNum = this.table.getRowNum();
    const colNum = this.table.getColNum();
    const grid = [...Array(rowNum).fill(0)].map((row, i) => this.createRow(i, colNum));
    return (
      <div
        className={classNames(isEditMode ? styles.editMode : styles.viewMode)}
        ref={this.setTableViewerRef}
      >
        <DataSheet
          data={grid}
          valueRenderer={this.valueRenderer}
          onSelect={onSelect}
          selected={selected || {}}
          cellRenderer={this.cellRenderer}
          rowRenderer={this.rowRenderer}
          sheetRenderer={this.sheetRenderer}
          onClear={onClear}
          getCellContent={this.table.getCellContent}
          setCellContent={setCellContent}
          onPaste={onPaste}
        />
      </div>
    );
  }
}

TableViewer.propTypes = {
  theme: PropTypes.object.isRequired,
  renderInnerRCE: PropTypes.func,
  innerRCV: PropTypes.func,
  table: PropTypes.object,
  onSelect: PropTypes.func,
  setRowRef: PropTypes.func,
  setEditorRef: PropTypes.func,
  toolbarRef: PropTypes.any,
  setEditingActive: PropTypes.func,
  columns: PropTypes.any,
  selected: PropTypes.object,
  componentData: PropTypes.object,
  tableWidth: PropTypes.number,
  isMobile: PropTypes.bool.isRequired,
  isEditMode: PropTypes.bool,
  t: PropTypes.func,
  disableSelectedStyle: PropTypes.bool,
  colDragProps: PropTypes.object,
  onResize: PropTypes.func,
  onResizeStart: PropTypes.func,
  highlightResizer: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
  selectAll: PropTypes.bool,
  tableHeight: PropTypes.number,
  isEditingActive: PropTypes.bool,
  setCellContent: PropTypes.func,
  onClear: PropTypes.func,
  onPaste: PropTypes.func,
  tableOverflowWidth: PropTypes.number,
  rowsToUpdate: PropTypes.array,
  selectCellContent: PropTypes.func,
};

export default TableViewer;
