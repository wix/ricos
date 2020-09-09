import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styles from '../../statics/styles/cell.scss';
import { paddingDiff } from '../tableUtils';

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

  onRowMouseDown = e => {
    this.curRow = e.target.parentElement.parentElement;
    this.pageY = e.pageY;
    const padding = paddingDiff(this.curRow);
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
