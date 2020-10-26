import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DataSheet from 'react-datasheet/lib';
import { CellRenderer, TableRenderer, RowRenderer } from './components';
import styles from '../statics/styles/table-viewer.scss';
import { TableDataUtil } from './tableUtils';

class TableViewer extends Component {
  constructor(props) {
    super(props);
    this.table = this.props.table || new TableDataUtil(props.componentData);
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
      : innerRCV({ contentState: this.table.getCellContent(i, j) });
  };

  // createRow = (i, columnsNumber) =>
  //   [...Array(columnsNumber).fill(0)].map(
  //     (cell, j) => this.grid?.[i]?.[j] || this.cellCreator(i, j)
  //   );

  createRow = (i, columnsNumber) =>
    [...Array(columnsNumber).fill(0)].map((cell, j) => this.cellCreator(i, j));

  sheetRenderer = props => {
    return (
      <TableRenderer
        {...props}
        columns={this.props.tableEditingProps?.columns}
        getColWidth={this.table.getColWidth}
      />
    );
  };

  rowRenderer = props => (
    <RowRenderer
      {...props}
      getRowHeight={this.table.getRowHeight}
      setRowRef={this.props.setRowRef}
      rows={this.props.tableEditingProps?.rows}
    />
  );

  setCellRef = ref => (this.cellRef = ref);

  cellRenderer = props => {
    const {
      setEditorRef,
      toolbarRef,
      setEditingActive,
      updateCellContent,
      tableEditingProps,
      tableWidth,
      isMobile,
    } = this.props;
    const { selected = {} } = tableEditingProps || {};

    return (
      <CellRenderer
        {...props}
        ref={this.setCellRef}
        table={this.table}
        setEditorRef={setEditorRef}
        toolbarRef={toolbarRef}
        selectedCells={selected}
        setEditingActive={setEditingActive}
        updateCellContent={updateCellContent}
        tableWidth={tableWidth}
        isMobile={isMobile}
      />
    );
  };

  valueRenderer = cell => cell.component;

  render() {
    const { onSelect, handleCopy, tableEditingProps } = this.props;
    const { selected = {} } = tableEditingProps || {};
    const rowNum = this.table.getRowNum();
    const colNum = this.table.getColNum();
    this.grid = [...Array(rowNum).fill(0)].map((row, i) => this.createRow(i, colNum));
    const dataSheetProps = {
      data: this.grid,
      valueRenderer: this.valueRenderer,
      onSelect,
      selected,
      cellRenderer: this.cellRenderer,
      rowRenderer: this.rowRenderer,
      sheetRenderer: this.sheetRenderer,
      handleCopy,
    };

    return tableEditingProps ? (
      <DataSheet {...dataSheetProps} />
    ) : (
      <div className={styles.tableWrapper}>
        <DataSheet {...dataSheetProps} />
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
  handleCopy: PropTypes.func,
  setRowRef: PropTypes.func,
  setEditorRef: PropTypes.func,
  toolbarRef: PropTypes.any,
  setEditingActive: PropTypes.func,
  updateCellContent: PropTypes.func,
  tableEditingProps: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  componentData: PropTypes.object,
  tableWidth: PropTypes.number,
  isMobile: PropTypes.bool.isRequired,
};

export default TableViewer;
