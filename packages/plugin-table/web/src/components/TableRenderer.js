import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styles from '../../statics/styles/table-viewer.scss';
import { debounce } from 'lodash';
import { CELL_AUTO_MIN_WIDTH } from '../consts';
import Columns from './Columns';
import { getRange } from '../domain/tableDataUtil';
export default class TableRenderer extends PureComponent {
  constructor(props) {
    super(props);
    this.columns = [props.table.getColNum()];
  }

  componentDidMount() {
    window.addEventListener('resize', this.onResizeWindow);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResizeWindow);
  }

  onResizeWindow = debounce(() => {
    this.setState({ windowWidth: window.innerWidth });
    const { table, tableRef } = this.props;
    tableRef.offsetWidth &&
      this.columns.forEach((col, i) => {
        const width = table.getCellWidthAsPixel(
          tableRef.offsetWidth - 1,
          i,
          table.getColsMinWidth()
        );
        col && (col.style.width = width + 'px');
      });
  }, 60);

  render() {
    const {
      children,
      tableRef,
      table,
      colDragProps,
      onResize,
      onResizeStart,
      highlightResizer,
      selected,
      selectAll,
      tableHeight,
      isEditMode,
      isEditingActive,
      tableOverflowWidth,
    } = this.props;
    const range = selected && getRange(selected);
    const colsMinWidth = table.getColsMinWidth();
    this.columns = this.columns.filter(elem => elem.parentElement);
    return (
      <table className={styles.container}>
        <colgroup>
          {tableRef?.offsetWidth &&
            table.getColsWidth().map((cellWidth, i) => (
              <col
                key={i}
                ref={ref => ref && (this.columns[i] = ref)}
                style={{
                  width: table.getCellWidthAsPixel(tableRef.offsetWidth - 1, i, colsMinWidth),
                  minWidth: colsMinWidth?.[i] || CELL_AUTO_MIN_WIDTH,
                }}
              />
            ))}
        </colgroup>
        <thead>
          {isEditMode && (
            <Columns
              colDragProps={colDragProps}
              colNum={table.getColNum()}
              onResize={onResize}
              onResizeStart={onResizeStart}
              highlightResizer={highlightResizer}
              activeDrag={
                isEditingActive ? [] : table.getSelectedCols(range)?.map(i => parseInt(i))
              }
              selectAll={selectAll}
              size={tableHeight}
              tableWidth={tableRef?.offsetWidth}
              columnsRefs={this.columns}
              tableOverflowWidth={tableOverflowWidth}
            />
          )}
        </thead>
        <tbody>{children}</tbody>
      </table>
    );
  }
}

TableRenderer.propTypes = {
  children: PropTypes.any,
  columns: PropTypes.any,
  table: PropTypes.any,
  tableRef: PropTypes.any,
  colDragProps: PropTypes.object,
  onResize: PropTypes.func,
  onResizeStart: PropTypes.func,
  highlightResizer: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
  selectAll: PropTypes.bool,
  tableHeight: PropTypes.number,
  isEditMode: PropTypes.bool,
  selected: PropTypes.object,
  isEditingActive: PropTypes.bool,
  tableOverflowWidth: PropTypes.number,
};
