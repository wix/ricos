import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DataSheet from 'react-datasheet/lib';
import 'react-datasheet/lib/react-datasheet.css';
import { isEqual } from 'lodash';
import CellRenderer from './components/CellRenderer';
import TableRenderer from './components/TableRenderer';
import RowRenderer from './components/RowRenderer';
import ValueViewer from './components/ValueViewer';
import {
  getRowNum,
  getColNum,
  getCellData,
  createEmptyCellContent,
  getCellContent,
  getRows,
  getRowColumns,
} from './tableUtils';

class TableViewer extends Component {
  constructor(props) {
    super(props);
    const { componentData } = this.props;
    const rowNum = getRowNum(componentData);
    const colNum = getColNum(componentData);

    this.state = {
      grid: [...Array(rowNum).fill(0)].map((row, i) => this.createRow(i, colNum)),
    };
    this.grid = [...Array(rowNum).fill(0)].map((row, i) => this.createRow(i, colNum));
  }

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
      valueViewer: props => <ValueViewer setCellContentHeight={setCellContentHeight} {...props} />,
    };
  };

  renderCell = (i, j) => {
    const { renderInnerRCE, viewerForInnerRCE, componentData } = this.props;
    const contentState = getCellContent(componentData, i, j) || createEmptyCellContent();
    return renderInnerRCE ? renderInnerRCE(i, j) : componentData && viewerForInnerRCE(contentState);
  };

  createRow = (i, columnsNumber) =>
    [...Array(columnsNumber).fill(0)].map((cell, j) => this.cellCreator(i, j));

  componentWillReceiveProps(nextProps) {
    if (
      !isEqual(getRows(nextProps.componentData), getRows(this.props.componentData)) ||
      !isEqual(getRowColumns(nextProps.componentData), getRowColumns(this.props.componentData))
    ) {
      const rowNum = getRowNum(nextProps.componentData);
      const colNum = getColNum(nextProps.componentData);
      this.setState({
        grid: [...Array(rowNum).fill(0)].map((row, i) => this.createRow(i, colNum)),
      });
    }
  }

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
    const { grid } = this.state;
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

    const dataSheetProps = {
      data: grid,
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
  viewerForInnerRCE: PropTypes.func,
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
