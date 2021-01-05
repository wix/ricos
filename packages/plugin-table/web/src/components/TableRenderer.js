import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styles from '../../statics/styles/table-viewer.scss';
import { debounce } from 'lodash';
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
      col && (col.style.width = width + 'px');
    });
  };

  render() {
    const { columns, children, tableRef, table } = this.props;
    return (
      <table className={styles.container}>
        <colgroup>
          {table.getColsWidth().map((cellWidth, i) => (
            <col
              key={i}
              ref={ref => (this.columns[i] = ref)}
              style={{
                width: table.getCellWidthAsPixel(tableRef?.offsetWidth, i),
                minWidth: 120,
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
};
