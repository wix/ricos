/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';
import TableViewer from './table-viewer';
import styles from '../statics/styles/table-component.scss';
import DragAndDropSection from './components/DragAndDropSection';
import CellToolbar from './components/CellToolbar';
import Table from './domain/table';
import {
  createEmptyCellContent,
  getRowNum,
  getColNum,
  getCellContent,
  getColsWidth,
  getRowsHeight,
  getRange,
  getRowsRange,
} from './tableUtils';
import AddNewSection from './components/AddNewSection';
import classNames from 'classnames';
import ClickOutside from 'react-click-outside';

class TableComponent extends React.Component {
  renderInnerRCE = (i, j) => {
    const { renderInnerRCE, componentData } = this.props;
    let contentState = getCellContent(componentData, i, j);
    if (!contentState) {
      contentState = createEmptyCellContent();
      this.table.updateCellContent(i, j, contentState);
    }
    const additionalProps = { placeholder: '' };
    return renderInnerRCE({
      contentState,
      callback: newContentState => this.table.updateCellContent(i, j, newContentState),
      renderedIn: 'table',
      additionalProps,
    });
  };

  selectRow = i =>
    this.setState({
      selected: { start: { i, j: 0 }, end: { i, j: getColNum(this.props.componentData) - 1 } },
    });

  selectCol = j =>
    this.setState({
      selected: { start: { i: 0, j }, end: { i: getRowNum(this.props.componentData) - 1, j } },
    });

  onSelect = selected => this.setState({ selected });

  handleSelectAllClipboardEvent = e => {
    if (e.ctrlKey || e.metaKey) {
      if (e.key === 'a') {
        e.preventDefault();
        this.setAllCellsSelected();
      }
    }
  };

  setAllCellsSelected = () =>
    this.setState({
      selected: {
        start: { i: 0, j: 0 },
        end: {
          i: getRowNum(this.props.componentData) - 1,
          j: getColNum(this.props.componentData) - 1,
        },
      },
    });

  selectAll = () => {
    this.setAllCellsSelected();
    this.setState({ clickOnSelectAll: true });
  };

  resetSelectAll = () => {
    this.setState({ clickOnSelectAll: false });
  };

  updateComponentData1 = data => {
    const { setData } = this.props.blockProps;
    setData(data);
    this.props.store.set('componentData', { ...data }, this.props.block.getKey());
  };

  onResizeCol = (index, width) =>
    this.table.setColumnWidth(
      getRange({
        start: { i: 0, j: index },
        end: { i: getRowNum(this.props.componentData) - 1, j: index },
      }),
      width
    );

  onResizeRow = (index, height) =>
    this.table.setRowHeight(
      getRowsRange({
        start: { i: index, j: 0 },
        end: { i: index, j: 0 },
      }),
      height
    );

  setTableRef = ref => (this.tableRef = ref);

  handleCopy = ({ end, start }) => this.setState({ copiedCellsRange: getRange({ start, end }) });

  onCellsChanged = changes => {
    const { copiedCellsRange } = this.state;
    const cellsToDelete = [];
    changes.forEach(data => {
      if (data.value === '') {
        cellsToDelete.push({ i: data.row, j: data.col });
      } else if (copiedCellsRange) {
        this.table.pasteCells(copiedCellsRange, data.row, data.col);
      }
    });
    cellsToDelete.length > 0 && this.table.clearRange(cellsToDelete);
  };

  highlightResizer = (i, isCol) => {
    isCol ? this.setState({ highlightColResizer: i }) : this.setState({ highlightRowResizer: i });
  };

  onColDragEnd = (from, to) => {
    this.table.reorderColumns(from, to);
    this.setState({ selected: {} });
  };

  onRowDragEnd = (from, to) => {
    this.table.reorderRows(from, to);
    this.setState({ selected: {} });
  };

  addLastRow = () => this.table.addRow(getRowNum(this.props.componentData));

  addLastCol = () => this.table.addColumn(getColNum(this.props.componentData));

  render() {
    const { componentData, theme } = this.props;
    const { selected, clickOnSelectAll, highlightColResizer, highlightRowResizer } =
      this.state || {};
    const rowNum = getRowNum(componentData);
    const colNum = getColNum(componentData);
    this.table = new Table(componentData, this.updateComponentData1);
    const gridTemplateColumns = getColsWidth(componentData);
    const gridTemplateRows = getRowsHeight(componentData);
    return (
      <div className={styles.tableEditorContainer}>
        <CellToolbar selected={selected} table={this.table} tableRef={this.tableRef} />
        <ClickOutside
          onClickOutside={this.resetSelectAll}
          className={classNames(styles.selectAll, clickOnSelectAll && styles.activeSelectAll)}
          onClick={this.selectAll}
        />
        <div className={styles.colsController} style={{ gridTemplateColumns }}>
          <DragAndDropSection
            cellsNum={colNum}
            onDragClick={this.selectCol}
            onPlusClick={this.table.addColumn}
            isCol
            selectAll={clickOnSelectAll}
            highlightResizer={this.highlightResizer}
            onDragEnd={this.onColDragEnd}
          />
        </div>
        <div className={styles.rowsController} style={{ gridTemplateRows }}>
          <DragAndDropSection
            cellsNum={rowNum}
            onDragClick={this.selectRow}
            onPlusClick={this.table.addRow}
            selectAll={clickOnSelectAll}
            highlightResizer={this.highlightResizer}
            onDragEnd={this.onRowDragEnd}
          />
        </div>
        <div className={styles.rceTable} onKeyDown={this.handleSelectAllClipboardEvent}>
          <TableViewer
            componentData={componentData}
            renderInnerRCE={this.renderInnerRCE}
            selected={selected}
            onSelect={this.onSelect}
            theme={theme}
            onResizeCol={this.onResizeCol}
            onResizeRow={this.onResizeRow}
            setTableRef={this.setTableRef}
            tableRef={this.tableRef}
            handleCopy={this.handleCopy}
            onCellsChanged={this.onCellsChanged}
            highlightColResizer={highlightColResizer}
            highlightRowResizer={highlightRowResizer}
          />
        </div>
        <AddNewSection style={styles.addCol} onClick={this.addLastCol} />
        <AddNewSection style={styles.addRow} onClick={this.addLastRow} />
      </div>
    );
  }
}

TableComponent.propTypes = {
  blockProps: PropTypes.object.isRequired,
  block: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired,
  componentData: PropTypes.object.isRequired,
  renderInnerRCE: PropTypes.func,
  theme: PropTypes.object,
};

export { TableComponent as Component };
