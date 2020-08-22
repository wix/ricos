import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DataSheet from 'react-datasheet/lib';
import 'react-datasheet/lib/react-datasheet.css';
import CellRenderer from './components/CellRenderer';
import TableRenderer from './components/TableRenderer';
import RowRenderer from './components/RowRenderer';
import ValueViewer from './components/ValueViewer';
import { getRowNum, getColNum, getCellData, getCellContent } from './tableUtils';

class TableViewer extends Component {
  cellCreator = (i, j) => {
    const { setDragsVisibility, setCellContentHeight } = this.props;
    const editorContainerProps = setDragsVisibility
      ? {
          onMouseOver: () => setDragsVisibility(i, j),
        }
      : {};
    return {
      key: `${i}-${j}`,
      component: <div {...editorContainerProps}>{this.renderCell(i, j)}</div>,
      forceComponent: true,
      valueViewer: props => <ValueViewer setCellContentHeight={setCellContentHeight} {...props} />,
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
      cellRenderer: CellRenderer,
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
  setDragsVisibility: PropTypes.func,
  onSelect: PropTypes.func,
  onResizeCol: PropTypes.func,
  onResizeRow: PropTypes.func,
  setTableRef: PropTypes.func,
  tableRef: PropTypes.any,
  setCellContentHeight: PropTypes.func,
  handleCopy: PropTypes.func,
  onCellsChanged: PropTypes.func,
};

export default TableViewer;
