import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from '../../statics/styles/table-viewer.scss';

export default class TableRenderer extends PureComponent {
  render() {
    const { className, setTableRef } = this.props;
    return (
      <table className={classNames(className, styles.container)} ref={setTableRef}>
        {this.props.children}
      </table>
    );
  }
}

TableRenderer.propTypes = {
  onResizeCol: PropTypes.func,
  className: PropTypes.string,
  setTableRef: PropTypes.func.isRequired,
  children: PropTypes.any,
};
