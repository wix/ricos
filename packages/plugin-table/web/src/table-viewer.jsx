import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DataSheet from 'react-datasheet/lib';
import { CellRenderer, TableRenderer, RowRenderer } from './components';
import { getRowNum, getColNum, getCellContent } from './tableUtils';
import styles from '../statics/styles/table-viewer.scss';

class TableViewer extends Component {
  cellCreator = (i, j) => ({
    key: `${i}-${j}`,
    component: this.renderCell(i, j),
    forceComponent: true,
    disableUpdatedFlag: true,
  });

  renderCell = (i, j) => {
    const { renderInnerRCE, innerRCV, componentData } = this.props;
    return renderInnerRCE ? renderInnerRCE(i, j) : innerRCV(getCellContent(componentData, i, j));
  };

  // createRow = (i, columnsNumber) =>
  //   [...Array(columnsNumber).fill(0)].map(
  //     (cell, j) => this.grid?.[i]?.[j] || this.cellCreator(i, j)
  //   );

  createRow = (i, columnsNumber) =>
    [...Array(columnsNumber).fill(0)].map((cell, j) => this.cellCreator(i, j));

  sheetRenderer = props => {
    const { componentData } = this.props;
    return (
      <TableRenderer
        {...props}
        rowNum={getRowNum(componentData)}
        colNum={getColNum(componentData)}
        setTableRef={this.props.setTableRef}
      />
    );
  };

  rowRenderer = props => (
    <RowRenderer
      {...props}
      componentData={this.props.componentData}
      setRowRef={this.props.setRowRef}
      updateRowsRefs={this.props.updateRowsRefs}
    />
  );

  setCellRef = ref => (this.cellRef = ref);

  cellRenderer = props => (
    <CellRenderer
      {...props}
      ref={this.setCellRef}
      highlightColResizer={this.props.highlightColResizer}
      highlightRowResizer={this.props.highlightRowResizer}
      colNum={getColNum(this.props.componentData)}
      setEditorRef={this.props.setEditorRef}
      toolbarRef={this.props.toolbarRef}
      selectedCells={this.props.selected}
      setEditingActive={this.props.setEditingActive}
      componentData={this.props.componentData}
      updateCellContent={this.props.updateCellContent}
      onResize={this.props.onResize}
      offsetHeight={this.props.tableRef?.offsetHeight}
      offsetWidth={this.props.tableRef?.offsetWidth}
    />
  );

  valueRenderer = cell => cell.component;

  render() {
    const { selected = {}, onSelect, componentData, handleCopy, innerRCV } = this.props;
    const rowNum = getRowNum(componentData);
    const colNum = getColNum(componentData);
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

    return innerRCV ? (
      <div className={styles.tableWrapper}>
        <DataSheet {...dataSheetProps} />
      </div>
    ) : (
      <DataSheet {...dataSheetProps} />
    );
  }
}

TableViewer.propTypes = {
  theme: PropTypes.object.isRequired,
  renderInnerRCE: PropTypes.func,
  innerRCV: PropTypes.func,
  componentData: PropTypes.object,
  selected: PropTypes.any,
  onSelect: PropTypes.func,
  onResize: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  setTableRef: PropTypes.func,
  tableRef: PropTypes.any,
  handleCopy: PropTypes.func,
  highlightColResizer: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
  highlightRowResizer: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
  setRowRef: PropTypes.func,
  setEditorRef: PropTypes.func,
  toolbarRef: PropTypes.any,
  setEditingActive: PropTypes.func,
  updateCellContent: PropTypes.func,
  updateRowsRefs: PropTypes.func,
};

export default TableViewer;
