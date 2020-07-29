import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { mergeStyles } from 'wix-rich-content-common';
import styles from '../statics/styles/table.scss';
import DataSheet from 'react-datasheet/lib';
import { createEmpty } from 'wix-rich-content-editor/dist/lib/editorStateConversion';
import 'react-datasheet/lib/react-datasheet.css';
import { isEqual } from 'lodash';
import { getColNum, getRowNum } from './tableUtils';

class TableViewer extends Component {
  constructor(props) {
    super(props);
    const {
      componentData: {
        config: { cells },
      },
    } = this.props;
    this.state = {
      grid: [...Array(getRowNum(cells)).fill(0)].map((row, i) =>
        this.createRow(i, getColNum(cells))
      ),
    };
  }

  cellCreator = (i, j) => {
    const { setDragsVisibility, cleanSelectedCells } = this.props;
    const editorContainerProps = setDragsVisibility
      ? {
          onMouseOver: () => setDragsVisibility(i, j),
          onClick: cleanSelectedCells,
        }
      : {};
    return {
      width: 100,
      key: `${i}-${j}`,
      dataEditor: () => (
        //eslint-disable-next-line
        <div {...editorContainerProps}>
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
    if (!isEqual(nextProps.componentData.config.cells, this.props.componentData.config.cells)) {
      const {
        componentData: {
          config: { cells },
        },
      } = nextProps;
      this.setState({
        grid: [...Array(getRowNum(cells)).fill(0)].map((row, i) =>
          this.createRow(i, getColNum(cells))
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
  selected: PropTypes.any,
  setDragsVisibility: PropTypes.func,
  cleanSelectedCells: PropTypes.func,
};

export default TableViewer;
