import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { mergeStyles } from 'wix-rich-content-common';
import styles from '../statics/styles/table.scss';
import DataSheet from 'react-datasheet/lib';
import { createEmpty } from 'wix-rich-content-editor/dist/lib/editorStateConversion';
import 'react-datasheet/lib/react-datasheet.css';
import { isEqual } from 'lodash';

class TableViewer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: [...Array(this.props.rowNum).fill(0)].map((row, i) =>
        this.createRow(i, this.props.colNum)
      ),
    };
  }

  cellCreator = (i, j) => {
    return {
      width: 100,
      key: `${i}-${j}`,
      dataEditor: () => (
        //eslint-disable-next-line
        <div
          onMouseOver={() => this.props.setDragsVisibility(i, j)}
          onClick={this.props.cleanSelectedCells}
        >
          <div>{this.renderCell(i, j)}</div>
        </div>
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
    if (
      !isEqual(nextProps.rowNum, this.props.rowNum) ||
      !isEqual(nextProps.colNum, this.props.colNum)
    ) {
      this.setState({
        grid: [...Array(nextProps.rowNum).fill(0)].map((row, i) =>
          this.createRow(i, nextProps.colNum)
        ),
      });
    }
  }

  render() {
    const { grid } = this.state;
    const { selected } = this.props;
    this.styles = this.styles || mergeStyles({ styles, theme: this.props.theme });
    const dataSheetProps = {
      data: grid,
      selected,
      valueRenderer: cell => cell.dataEditor(),
    };

    return <DataSheet {...dataSheetProps} />;
  }
}

TableViewer.propTypes = {
  theme: PropTypes.object.isRequired,
  renderInnerRCE: PropTypes.func,
  viewerForInnerRCE: PropTypes.func,
  componentData: PropTypes.object,
  rowNum: PropTypes.number,
  colNum: PropTypes.number,
  selected: PropTypes.any,
  setDragsVisibility: PropTypes.func,
  cleanSelectedCells: PropTypes.func,
};

export default TableViewer;
