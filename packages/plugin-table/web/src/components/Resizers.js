import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { setColListeners, setRowListeners } from '../table-resize';
import styles from '../../statics/styles/cell.scss';

const RESIZER_STYLE = '1px solid #0000ff'; //need to change to dynamic action color

export default class Resizers extends PureComponent {
  setRowResizer = ref => {
    if (ref && !this.rowRef) {
      this.rowRef = ref;
      setRowListeners(ref, this.props.onResize.onResizeRow);
    }
  };
  setColResizer = ref => {
    if (ref && !this.colRef) {
      this.colRef = ref;
      setColListeners(ref, this.props.onResize.onResizeCol);
    }
  };

  render() {
    const { row, col, onResize, highlightColResizer, highlightRowResizer, table } = this.props;

    const { offsetHeight, offsetWidth } = table;
    const colResizerStyle = highlightColResizer === col ? { borderRight: RESIZER_STYLE } : {};
    const rowResizerStyle = highlightRowResizer === row ? { borderBottom: RESIZER_STYLE } : {};

    return [
      row === 0 && onResize && (
        <div
          className={styles.colResizer}
          style={{ height: offsetHeight, ...colResizerStyle }}
          ref={this.setColResizer}
        />
      ),
      col === 0 && onResize && (
        <div
          className={styles.rowResizer}
          style={{ width: offsetWidth, ...rowResizerStyle }}
          ref={this.setRowResizer}
        />
      ),
    ];
  }
}

Resizers.propTypes = {
  row: PropTypes.number.isRequired,
  col: PropTypes.number.isRequired,
  table: PropTypes.object,
  onResize: PropTypes.object,
  highlightColResizer: PropTypes.number || PropTypes.bool,
  highlightRowResizer: PropTypes.number || PropTypes.bool,
};
