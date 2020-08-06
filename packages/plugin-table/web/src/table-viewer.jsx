import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DataSheet from 'react-datasheet/lib';
import { createEmpty } from 'wix-rich-content-editor/dist/lib/editorStateConversion';
import 'react-datasheet/lib/react-datasheet.css';
import { isEqual } from 'lodash';
import CellRenderer from './components/CellRenderer';
import TableRenderer from './components/TableRenderer.js';
import Table from './domain/table';

class TableViewer extends Component {
  constructor(props) {
    super(props);
    const { componentData } = this.props;
    this.table = props.table || new Table(componentData, () => {});
    this.state = {
      grid: [...Array(this.table.rowNum).fill(0)].map((row, i) =>
        this.createRow(i, this.table.colNum)
      ),
    };
  }

  cellCreator = (i, j) => {
    const { setDragsVisibility } = this.props;
    const editorContainerProps = setDragsVisibility
      ? {
          onMouseOver: () => setDragsVisibility(i, j),
        }
      : {};
    return {
      key: `${i}-${j}`,
      component: (
        //eslint-disable-next-line
        <div {...editorContainerProps}>{this.renderCell(i, j)}</div>
      ),
    };
  };

  renderCell = (i, j) => {
    const { renderInnerRCE, viewerForInnerRCE, componentData } = this.props;
    return renderInnerRCE
      ? renderInnerRCE(i, j)
      : viewerForInnerRCE(componentData.config.cells[i][j]);
  };

  createEmptyRow = columnsNumber => [...Array(columnsNumber).fill(createEmpty())];

  createRow = (i, columnsNumber) =>
    [...Array(columnsNumber).fill(0)].map((cell, j) => this.cellCreator(i, j));

  componentWillReceiveProps(nextProps) {
    this.table = nextProps.table || new Table(nextProps.componentData, () => {});
    if (!isEqual(nextProps.componentData.config.cells, this.props.componentData.config.cells)) {
      this.setState({
        grid: [...Array(this.table.rowNum).fill(0)].map((row, i) =>
          this.createRow(i, this.table.colNum)
        ),
      });
    }
  }

  sheetRenderer = props => (
    <TableRenderer
      {...props}
      rowNum={this.table.rowNum}
      colNum={this.table.colNum}
      onResizeCol={this.props.onResizeCol}
    />
  );

  render() {
    const { grid } = this.state;
    const { selected, onSelect, componentData } = this.props;
    this.table = this.props.table || new Table(componentData, () => {});

    const dataSheetProps = {
      data: grid,
      valueRenderer: cell => cell.component,
      onSelect,
      selected,
      cellRenderer: CellRenderer,
      sheetRenderer: this.sheetRenderer,
      attributesRenderer: (cell, row, col) => ({
        additionalStyles: this.table.getCellStyle(row, col),
      }),
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
  table: PropTypes.any,
  onSelect: PropTypes.func,
  onResizeCol: PropTypes.func,
};

export default TableViewer;
