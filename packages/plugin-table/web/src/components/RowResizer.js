import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styles from '../../statics/styles/cell.scss';

const RESIZER_STYLE = '1px solid #0000ff'; //need to change to dynamic action color

export default class RowResizer extends PureComponent {
  componentDidMount() {
    document.addEventListener('mousemove', e => {
      if (this.curRow) {
        this.onRowMouseMove(e);
      }
    });
    document.addEventListener('mouseup', e => {
      if (this.curRow && this.pageY && this.curRowHeight) {
        this.onRowMouseUp(e);
      }
    });
  }
  getStyleVal = (elm, css) => {
    return window.getComputedStyle(elm, null).getPropertyValue(css);
  };

  paddingDiff = col => {
    if (this.getStyleVal(col, 'box-sizing') === 'border-box') {
      return 0;
    }
    const padLeft = this.getStyleVal(col, 'padding-left');
    const padRight = this.getStyleVal(col, 'padding-right');
    return parseInt(padLeft) + parseInt(padRight);
  };

  onRowMouseDown = e => {
    this.curRow = e.target.parentElement.parentElement;
    this.pageY = e.pageY;
    const padding = this.paddingDiff(this.curRow);
    this.curRowHeight = this.curRow.offsetHeight - padding;
  };

  onRowMouseMove = e => {
    const diffY = e.pageY - this.pageY;
    this.curRow.style.height = this.curRowHeight + diffY + 'px';
  };

  onRowMouseUp = () => {
    if (this.curRow && this.pageY && this.curRowHeight) {
      this.props.onResize(this.curRow.dataset.row, this.curRow.style.height);
      this.curRow = undefined;
      this.pageY = undefined;
      this.curRowHeight = undefined;
    }
  };

  render() {
    const { row, highlightRowResizer, offsetWidth } = this.props;

    const rowResizerStyle = highlightRowResizer === row ? { borderBottom: RESIZER_STYLE } : {};

    return (
      //eslint-disable-next-line
      <div
        className={styles.rowResizer}
        style={{ width: offsetWidth, ...rowResizerStyle }}
        onMouseDown={this.onRowMouseDown}
      />
    );
  }
}

RowResizer.propTypes = {
  row: PropTypes.number.isRequired,
  offsetWidth: PropTypes.string,
  onResize: PropTypes.func.isRequired,
  highlightRowResizer: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
};
