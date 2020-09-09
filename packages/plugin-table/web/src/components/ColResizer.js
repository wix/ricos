import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styles from '../../statics/styles/cell.scss';
import { paddingDiff } from '../tableUtils';

const RESIZER_STYLE = '1px solid #0000ff'; //need to change to dynamic action color

export default class ColResizer extends PureComponent {
  componentDidMount() {
    document.addEventListener('mousemove', e => {
      if (this.curCol) {
        this.onColMouseMove(e);
      }
    });
    document.addEventListener('mouseup', e => {
      if (this.curCol && this.nxtCol && this.pageX && this.nxtColWidth && this.curColWidth) {
        this.onColMouseUp(e);
      }
    });
  }
  onColMouseDown = e => {
    this.curCol = e.target.parentElement;
    this.nxtCol = this.curCol.nextElementSibling;
    this.pageX = e.pageX;

    const padding = paddingDiff(this.curCol);

    this.curColWidth = this.curCol.offsetWidth - padding;
    if (this.nxtCol) this.nxtColWidth = this.nxtCol.offsetWidth - padding;
  };

  onColMouseMove = e => {
    const diffX = e.pageX - this.pageX;
    if (this.nxtCol) this.nxtCol.style.width = this.nxtColWidth - diffX + 'px';
    this.curCol.style.width = this.curColWidth + diffX + 'px';
  };

  onColMouseUp = () => {
    if (this.curCol && this.nxtCol && this.pageX && this.nxtColWidth && this.curColWidth) {
      const curIndex = this.curCol.dataset.col;
      const curWidth = this.curCol.offsetWidth;
      const nxtIndex = this.nxtCol.dataset.col;
      const nxtWidth = this.nxtCol.offsetWidth;
      this.props.onResize(curIndex, curWidth);
      this.props.onResize(nxtIndex, nxtWidth);
      this.curCol = undefined;
      this.nxtCol = undefined;
      this.pageX = undefined;
      this.nxtColWidth = undefined;
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
};
