import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styles from '../../statics/styles/table-viewer.scss';

export default class TableRenderer extends PureComponent {
  render() {
    const { columns, children, getColWidth } = this.props;
    return (
      <table className={styles.container}>
        <thead>{columns && React.cloneElement(columns, { getColWidth })}</thead>
        <tbody>{children}</tbody>
      </table>
    );
  }
}

TableRenderer.propTypes = {
  children: PropTypes.any,
  columns: PropTypes.any,
  getColWidth: PropTypes.func,
};
