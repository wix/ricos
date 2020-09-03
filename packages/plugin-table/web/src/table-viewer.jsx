import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DataSheet from 'react-datasheet/lib';
import CellRenderer from './components/CellRenderer';
import TableRenderer from './components/TableRenderer';
import RowRenderer from './components/RowRenderer';
import { getRowNum, getColNum, getCell, getCellContent } from './tableUtils';

class TableViewer extends Component {
  cellCreator = (i, j) => {
    return {
      key: `${i}-${j}`,
      component: this.renderCell(i, j),
      forceComponent: true,
      disableUpdatedFlag: true,
    };
  };

  renderCell = (i, j) => {
    const { renderInnerRCE, innerRCV, componentData } = this.props;
    return renderInnerRCE ? renderInnerRCE(i, j) : innerRCV(getCellContent(componentData, i, j));
  };

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
    />
  );

  cellRenderer = props => (
    <CellRenderer
      {...props}
      highlightColResizer={this.props.highlightColResizer}
      highlightRowResizer={this.props.highlightRowResizer}
    />
  );

  valueRenderer = cell => cell.component;

  attributesRenderer = (cell, row, col) => {
    const { componentData, tableRef, onResize } = this.props;
    return {
      cellData: getCell(componentData, row, col),
      table: tableRef,
      onResize,
    };
  };

  render() {
    const { selected, onSelect, componentData, handleCopy, onCellsChanged } = this.props;
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
      attributesRenderer: this.attributesRenderer,
      handleCopy,
      onCellsChanged,
    };

    return <DataSheet {...dataSheetProps} />;
  }
}

TableViewer.propTypes = {
  theme: PropTypes.object.isRequired,
  renderInnerRCE: PropTypes.func,
  innerRCV: PropTypes.func,
  componentData: PropTypes.object,
  selected: PropTypes.any,
  onSelect: PropTypes.func,
  onResize: PropTypes.object,
  setTableRef: PropTypes.func,
  tableRef: PropTypes.any,
  handleCopy: PropTypes.func,
  onCellsChanged: PropTypes.func,
  highlightColResizer: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
  highlightRowResizer: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
  setRowRef: PropTypes.func,
};

export default TableViewer;
