import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styles from '../../statics/styles/cell.scss';
import { paddingDiff } from '../tableUtils';
import { CELL_MIN_WIDTH } from '../consts';

const RESIZER_STYLE = '1px solid #0000ff'; //need to change to dynamic action color

export default class ColResizer extends PureComponent {
  componentDidMount() {
    if (!this.props.disableResize) {
      document.addEventListener('mousemove', this.onColMouseMove);
      document.addEventListener('mouseup', this.onColMouseUp);
    }
  }
  componentWillUnmount() {
    if (!this.props.disableResize) {
      document.removeEventListener('mousemove', this.onColMouseMove);
      document.removeEventListener('mouseup', this.onColMouseUp);
    }
  }
  onColMouseDown = e => {
    this.curCol = e.target.parentElement;
    this.pageX = e.pageX;
    const padding = paddingDiff(this.curCol);
    this.curColWidth = this.curCol.offsetWidth - padding;
  };

  onColMouseMove = e => {
    if (this.curCol) {
      const diffX = e.pageX - this.pageX;
      const newWidth = this.curColWidth + diffX;
      if (newWidth >= CELL_MIN_WIDTH) {
        this.curCol.style.width = newWidth + 'px';
      }
    }
  };

  onColMouseUp = () => {
    if (!this.props.disableResize && this.curCol && this.pageX && this.curColWidth) {
      const curIndex = this.curCol.dataset.col;
      const curWidth = this.curCol.offsetWidth;
      this.props.onResize(curIndex, curWidth);
      this.curCol = undefined;
      this.pageX = undefined;
      this.curColWidth = undefined;
    }
  };

  render() {
    const { col, highlightColResizer, offsetHeight } = this.props;
    const colResizerStyle = highlightColResizer === col ? { borderRight: RESIZER_STYLE } : {};
    return (
      //eslint-disable-next-line
      <div
        className={styles.colResizer}
        style={{ height: offsetHeight, ...colResizerStyle }}
        onMouseDown={this.onColMouseDown}
      />
    );
  }
}

ColResizer.propTypes = {
  col: PropTypes.number.isRequired,
  offsetHeight: PropTypes.string,
  onResize: PropTypes.object,
  highlightColResizer: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
  disableResize: PropTypes.bool,
};
