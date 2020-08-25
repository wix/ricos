import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styles from '../../statics/styles/table-viewer.scss';

export default class TableRenderer extends PureComponent {
  render() {
    const { setTableRef } = this.props;
    return (
      <table className={styles.container} ref={setTableRef}>
        {this.props.children}
      </table>
    );
  }
}

TableRenderer.propTypes = {
  onResizeCol: PropTypes.func,
  setTableRef: PropTypes.func.isRequired,
  children: PropTypes.any,
};
