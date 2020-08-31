import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styles from '../../statics/styles/table-viewer.scss';

export default class TableRenderer extends PureComponent {
  render() {
    return (
      <table className={styles.container} ref={this.props.setTableRef}>
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
