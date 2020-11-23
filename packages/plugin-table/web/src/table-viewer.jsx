import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DataSheet from 'react-datasheet/lib';
import { CellRenderer, TableRenderer, RowRenderer } from './components';
import styles from '../statics/styles/table-viewer.scss';
import { TableDataUtil } from './tableUtils';
import classNames from 'classnames';

class TableViewer extends Component {
  constructor(props) {
    super(props);
    this.table = this.props.table || new TableDataUtil(props.componentData);
  }
  cellCreator = (i, j) => ({
    key: `${i}-${j}`,
    component: this.renderCell(i, j),
    forceComponent: true,
    disableUpdatedFlag: true,
  });

  renderCell = (i, j) => {
    const { renderInnerRCE, innerRCV } = this.props;
    return renderInnerRCE
      ? renderInnerRCE(i, j)
      : innerRCV({ contentState: this.table.getCellContent(i, j) });
  };

  createRow = (i, columnsNumber) =>
    [...Array(columnsNumber).fill(0)].map((cell, j) => this.cellCreator(i, j));

  sheetRenderer = props => {
    return (
      <TableRenderer {...props} columns={this.props.columns} getColWidth={this.table.getColWidth} />
    );
  };

  rowRenderer = props => (
    <RowRenderer
      {...props}
      getRowHeight={this.table.getRowHeight}
      setRowRef={this.props.setRowRef}
      rows={this.props.rows}
    />
  );

  setCellRef = ref => (this.cellRef = ref);

  cellRenderer = props => {
    const {
      setEditorRef,
      toolbarRef,
      setEditingActive,
      updateCellContent,
      tableWidth,
      isMobile,
      selected = {},
      disableSelectedStyle,
      t,
      paletteColors,
    } = this.props;
    return (
      <CellRenderer
        {...props}
        ref={this.setCellRef}
        table={this.table}
        setEditorRef={setEditorRef}
        toolbarRef={toolbarRef}
        selectedCells={selected}
        setEditingActive={setEditingActive}
        updateCellContent={updateCellContent}
        tableWidth={tableWidth}
        isMobile={isMobile}
        disableSelectedStyle={disableSelectedStyle}
        t={t}
        paletteColors={paletteColors}
      />
    );
  };

  valueRenderer = cell => cell.component;

  render() {
    const { onSelect, selected, handleCopy, isEditMode, onPaste } = this.props;
    const rowNum = this.table.getRowNum();
    const colNum = this.table.getColNum();
    this.grid = [...Array(rowNum).fill(0)].map((row, i) => this.createRow(i, colNum));

    return (
      <div className={classNames(!isEditMode && styles.tableWrapper)}>
        <DataSheet
          data={this.grid}
          valueRenderer={this.valueRenderer}
          onSelect={onSelect}
          selected={selected || {}}
          cellRenderer={this.cellRenderer}
          rowRenderer={this.rowRenderer}
          sheetRenderer={this.sheetRenderer}
          handleCopy={handleCopy}
          onPaste={onPaste}
        />
      </div>
    );
  }
}

TableViewer.propTypes = {
  theme: PropTypes.object.isRequired,
  renderInnerRCE: PropTypes.func,
  innerRCV: PropTypes.func,
  table: PropTypes.object,
  onSelect: PropTypes.func,
  handleCopy: PropTypes.func,
  setRowRef: PropTypes.func,
  setEditorRef: PropTypes.func,
  toolbarRef: PropTypes.any,
  setEditingActive: PropTypes.func,
  updateCellContent: PropTypes.func,
  columns: PropTypes.any,
  rows: PropTypes.any,
  selected: PropTypes.object,
  componentData: PropTypes.object,
  tableWidth: PropTypes.number,
  isMobile: PropTypes.bool.isRequired,
  isEditMode: PropTypes.bool,
  onPaste: PropTypes.func,
  t: PropTypes.func,
  disableSelectedStyle: PropTypes.bool,
  paletteColors: PropTypes.object,
};

export default TableViewer;
