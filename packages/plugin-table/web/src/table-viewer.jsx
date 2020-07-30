import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { mergeStyles } from 'wix-rich-content-common';
import styles from '../statics/styles/table.scss';
import DataSheet from 'react-datasheet/lib';
import { createEmpty } from 'wix-rich-content-editor/dist/lib/editorStateConversion';
import 'react-datasheet/lib/react-datasheet.css';
import { isEqual } from 'lodash';
import Table from './domain/table';

// const CellRenderer = props => {
//   const {
//     cell,
//     row,
//     col,
//     columns,
//     attributesRenderer,
//     selected,
//     editing,
//     updated,
//     style,
//     // className,
//     setDragsVisibility,
//     ...rest
//   } = props;
//   console.log(props);
//   const editorContainerProps = setDragsVisibility
//     ? {
//         onMouseOver: () => console.log('cell hovered!'), //setDragsVisibility(row, col),
//         onClick: () => console.log('cell clicked!'),
//       }
//     : {};
//   return (
//     <td data-hook={'danaRish'} style={{ width: 100 }} {...editorContainerProps} {...rest}>
//       {props.children}
//     </td>
//   );
// };

class TableViewer extends Component {
  constructor(props) {
    super(props);
    const { componentData } = this.props;
    this.table = new Table(componentData);
    this.state = {
      grid: [...Array(this.table.getRowNum()).fill(0)].map((row, i) =>
        this.createRow(i, this.table.getColNum())
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
      this.table = new Table(nextProps.componentData);
      this.setState({
        grid: [...Array(this.table.getRowNum()).fill(0)].map((row, i) =>
          this.createRow(i, this.table.getColNum())
        ),
      });
    }
  }

  render() {
    const { grid } = this.state;
    const { selected, onSelect } = this.props;
    this.styles = this.styles || mergeStyles({ styles, theme: this.props.theme });
    const dataSheetProps = {
      data: grid,
      valueRenderer: cell => cell.component,
      onSelect,
      selected,
      // cellRenderer: props => (
      //   <CellRenderer
      //     columns={[...Array(this.table.getColNum()).fill({})]}
      //     setDragsVisibility={setDragsVisibility}
      //     onMouseOver={() => setDragsVisibility(props.row, props.col)}
      //     {...props}
      //   />
      // ),
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
};

export default TableViewer;
