import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import tableResizer from '../table-resize';
import classNames from 'classnames';
import styles from '../../statics/styles/table-viewer.scss';
import { isEqual } from 'lodash';

export default class TableRenderer extends PureComponent {
  setResize = ref => {
    const { onResizeCol } = this.props;
    this.ref = ref;
    if (onResizeCol && ref) {
      tableResizer(ref, onResizeCol);
    }
  };

  componentWillReceiveProps(nextProps) {
    const { rowNum, colNum } = this.props;
    if (!isEqual(nextProps.rowNum, rowNum) || !isEqual(nextProps.colNum, colNum)) {
      tableResizer(this.ref, this.props.onResizeCol);
    }
  }
  render() {
    const { className } = this.props;
    return (
      <table className={classNames(className, styles.container)} ref={this.setResize}>
        {this.props.children}
      </table>
    );
  }
}

TableRenderer.propTypes = {
  onResizeCol: PropTypes.func,
  className: PropTypes.string,
  children: PropTypes.any,
  rowNum: PropTypes.number,
  colNum: PropTypes.number,
};
