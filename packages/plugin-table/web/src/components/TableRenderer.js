import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styles from '../../statics/styles/table-viewer.scss';

export default class TableRenderer extends PureComponent {
  render() {
    const { setTableRef, columns, children, getColWidth } = this.props;
    return (
      <table className={styles.container} ref={setTableRef}>
        {columns && React.cloneElement(columns, { getColWidth })}
        {children}
      </table>
    );
  }
}

TableRenderer.propTypes = {
  setTableRef: PropTypes.func,
  children: PropTypes.any,
  columns: PropTypes.any,
  getColWidth: PropTypes.func,
};
