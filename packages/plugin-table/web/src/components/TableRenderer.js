import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styles from '../../statics/styles/table-viewer.scss';
import { debounce } from 'lodash';
import { CELL_AUTO_MIN_WIDTH } from '../consts';
export default class TableRenderer extends PureComponent {
  constructor(props) {
    super(props);
    this.columns = [props.table.getColNum()];
  }
  componentDidMount() {
    window.addEventListener('resize', debounce(this.onResizeWindow, 60));
  }
  componentWillUnmount() {
    window.removeEventListener('resize', debounce(this.onResizeWindow, 60));
  }

  onResizeWindow = () => {
    this.setState({ windowWidth: window.innerWidth });
    const { table, tableRef } = this.props;
    this.columns.forEach((col, i) => {
      const width = table.getCellWidthAsPixel(tableRef?.offsetWidth, i);
      col.style.width = width + 'px';
    });
  };

  render() {
    const { columns, children, tableRef, table, isMobile } = this.props;
    return (
      <table className={styles.container}>
        <colgroup>
          {table.getColsWidth().map((cellWidth, i) => (
            <col
              key={i}
              ref={ref => (this.columns[i] = ref)}
              style={{
                width: isMobile
                  ? CELL_AUTO_MIN_WIDTH
                  : table.getCellWidthAsPixel(tableRef?.offsetWidth, i),
                minWidth: CELL_AUTO_MIN_WIDTH,
              }}
            />
          ))}
        </colgroup>
        <thead>{columns && React.cloneElement(columns, { columnsRefs: this.columns })}</thead>
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
  isMobile: PropTypes.bool,
};
