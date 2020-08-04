import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { mergeStyles } from 'wix-rich-content-common';
import styles from '../statics/styles/table.scss';
import DataSheet from 'react-datasheet/lib';
import { createEmpty } from 'wix-rich-content-editor/dist/lib/editorStateConversion';
import 'react-datasheet/lib/react-datasheet.css';
import { isEqual } from 'lodash';
import CellRenderer from './components/CellRenderer';

class TableViewer extends Component {
  constructor(props) {
    super(props);
    const { table } = this.props;
    this.state = {
      grid: [...Array(table.rowNum).fill(0)].map((row, i) => this.createRow(i, table.colNum)),
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
      width: 100,
      key: `${i}-${j}`,
      forceComponent: true,
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
    if (!isEqual(nextProps.componentData.config.cells, this.props.componentData.config.cells)) {
      this.setState({
        grid: [...Array(nextProps.table.rowNum).fill(0)].map((row, i) =>
          this.createRow(i, nextProps.table.colNum)
        ),
      });
    }
  }

  render() {
    const { grid } = this.state;
    const { selected, onSelect, table } = this.props;
    this.styles = this.styles || mergeStyles({ styles, theme: this.props.theme });
    const dataSheetProps = {
      data: grid,
      valueRenderer: cell => cell.component,
      onSelect,
      selected,
      cellRenderer: CellRenderer,
      attributesRenderer: (cell, row, col) => ({
        additionalStyles: table.getCellStyle(row, col),
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
};

export default TableViewer;
