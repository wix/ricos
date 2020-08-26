import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DataSheet from 'react-datasheet/lib';
import CellRenderer from './components/CellRenderer';
import TableRenderer from './components/TableRenderer';
import RowRenderer from './components/RowRenderer';
import { getRowNum, getColNum, getCellData, getCellContent } from './tableUtils';

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

  rowRenderer = props => <RowRenderer {...props} componentData={this.props.componentData} />;

  cellRenderer = props => (
    <CellRenderer
      {...props}
      highlightColResizer={this.props.highlightColResizer}
      highlightRowResizer={this.props.highlightRowResizer}
    />
  );

  render() {
    const {
      selected,
      onSelect,
      componentData,
      onResizeCol,
      onResizeRow,
      tableRef,
      handleCopy,
      onCellsChanged,
    } = this.props;
    const rowNum = getRowNum(componentData);
    const colNum = getColNum(componentData);
    this.grid = [...Array(rowNum).fill(0)].map((row, i) => this.createRow(i, colNum));
    const dataSheetProps = {
      data: this.grid,
      valueRenderer: cell => cell.component,
      onSelect,
      selected,
      cellRenderer: this.cellRenderer,
      rowRenderer: this.rowRenderer,
      sheetRenderer: this.sheetRenderer,
      attributesRenderer: (cell, row, col) => ({
        cellData: getCellData(componentData, row, col),
        table: tableRef,
        onResize: { onResizeCol, onResizeRow },
      }),
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
  onResizeCol: PropTypes.func,
  onResizeRow: PropTypes.func,
  setTableRef: PropTypes.func,
  tableRef: PropTypes.any,
  handleCopy: PropTypes.func,
  onCellsChanged: PropTypes.func,
  highlightColResizer: PropTypes.number || PropTypes.bool,
  highlightRowResizer: PropTypes.number || PropTypes.bool,
};

export default TableViewer;
