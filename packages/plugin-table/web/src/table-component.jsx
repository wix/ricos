/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';
import TableViewer from './table-viewer';
import { TABLE_TYPE } from './types';
import styles from '../statics/styles/table-component.scss';
import DragAndDropToolbar from './components/DragAndDropToolbar';
import CellToolbar from './components/CellToolbar';
import Table from './domain/table';
import { createEmptyCellContent } from './tableUtils';

class TableComponent extends React.Component {
  static type = { TABLE_TYPE };
  constructor(props) {
    super(props);
    this.innerRCECaptionRef = {};
    this.state = {};
    this.colDragStyles = {
      cellsContainer: styles.colsController,
      cellController: styles.colController,
      add: styles.add,
    };

    this.rowDragStyles = {
      cellsContainer: styles.rowsController,
      cellController: styles.rowController,
      add: styles.add,
    };
  }

  renderInnerRCE = (i, j) => {
    const { innerRCEOpenModal, innerRCEReadOnly, componentData } = this.props;
    let contentState = componentData.config?.cells[i] && componentData.config.cells[i][j]?.content;
    if (!contentState) {
      contentState = createEmptyCellContent();
      contentState.blocks[0].text = 'blabla';
      this.table.updateCellContent(i, j, contentState);
    }
    return (
      <div
        className={styles.innerRce}
        onDoubleClick={() =>
          innerRCEOpenModal(
            contentState,
            newContentState => this.table.updateCellContent(i, j, newContentState),
            'table',
            this.innerRCECaptionRef[i][j]
          )
        }
      >
        <div
          className={styles.readOnly}
          ref={ref =>
            (this.innerRCECaptionRef = {
              ...this.innerRCECaptionRef,
              [i]: { ...this.innerRCECaptionRef[i], [j]: ref },
            })
          }
        >
          {innerRCEReadOnly(contentState)}
        </div>
      </div>
    );
  };

  setDragsVisibility = (i, j) => this.setState({ visibleRow: i, visibleCol: j });

  selectRow = (i, colNum) =>
    this.setState({ selected: { start: { i, j: 0 }, end: { i, j: colNum - 1 } } });

  selectCol = (j, rowNum) =>
    this.setState({ selected: { start: { i: 0, j }, end: { i: rowNum - 1, j } } });

  onSelect = selected => this.setState({ selected });

  updateComponentData1 = data => {
    const { setData } = this.props.blockProps;
    setData(data);
    this.props.store.set('componentData', { ...data }, this.props.block.getKey());
  };

  onResizeCol = (currentCol, nextCol) => {
    const currentColIndex = currentCol.dataset.col;
    const currentColWidth = currentCol.offsetWidth;
    this.table.setColumnWidth(currentColIndex, currentColWidth);

    const nextColIndex = nextCol.dataset.col;
    const nextColWidth = nextCol.offsetWidth;
    this.table.setColumnWidth(nextColIndex, nextColWidth);
  };

  onResizeRow = currentRow => {
    const currentRowIndex = currentRow.dataset.row;
    const currentRowHeight = currentRow.offsetHeight;
    this.table.setRowHeight(currentRowIndex, currentRowHeight);
  };

  setTableRef = ref => (this.tableRef = ref);

  render() {
    const { componentData, theme } = this.props;
    const { visibleRow, visibleCol, selected } = this.state;
    this.table = new Table(componentData, this.updateComponentData1);
    const rowNum = this.table.rowNum;
    const colNum = this.table.colNum;

    return (
      <div className={styles.tableEditorContainer}>
        <CellToolbar selected={selected} table={this.table} tableRef={this.tableRef} />
        <DragAndDropToolbar
          visibleDrag={visibleCol}
          styles={this.colDragStyles}
          cellsNum={colNum}
          onDragClick={j => this.selectCol(j, rowNum)}
          onPlusClick={i => this.table.addColumn(i)}
        />
        <DragAndDropToolbar
          visibleDrag={visibleRow}
          styles={this.rowDragStyles}
          cellsNum={rowNum}
          onDragClick={i => this.selectRow(i, colNum)}
          onPlusClick={i => this.table.addRow(i)}
        />
        <div className={styles.rceTable}>
          <TableViewer
            componentData={componentData}
            renderInnerRCE={this.renderInnerRCE}
            setDragsVisibility={this.setDragsVisibility}
            selected={selected}
            onSelect={this.onSelect}
            theme={theme}
            table={this.table}
            onResizeCol={this.onResizeCol}
            onResizeRow={this.onResizeRow}
            setTableRef={this.setTableRef}
            tableRef={this.tableRef}
          />
        </div>
        <div className={styles.addCol} onClick={() => this.table.addColumn(colNum)}>
          +
        </div>
        <div className={styles.addRow} onClick={() => this.table.addRow(rowNum)}>
          + New row
        </div>
      </div>
    );
  }
}

TableComponent.propTypes = {
  blockProps: PropTypes.object.isRequired,
  block: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired,
  componentData: PropTypes.object.isRequired,
  innerRCEOpenModal: PropTypes.func,
  innerRCEReadOnly: PropTypes.func,
  theme: PropTypes.object,
};

export { TableComponent as Component };
