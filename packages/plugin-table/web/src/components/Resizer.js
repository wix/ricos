import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styles from '../../statics/styles/resizer.scss';
import { paddingDiff } from '../tableUtils';
import classNames from 'classnames';

const RESIZER_STYLE = '1px solid #0000ff'; //need to change to dynamic action color

export default class Resizer extends PureComponent {
  componentDidMount() {
    if (!this.props.disableResize) {
      document.addEventListener('mousemove', this.onMouseMove);
      document.addEventListener('mouseup', this.onMouseUp);
    }
  }
  componentWillUnmount() {
    if (!this.props.disableResize) {
      document.removeEventListener('mousemove', this.onMouseMove);
      document.removeEventListener('mouseup', this.onMouseUp);
    }
  }

  getPosition = e => (this.props.horizontal ? e.pageX : e.pageY);

  getSize = () =>
    this.props.horizontal ? this.curTarget.offsetWidth : this.curTarget.offsetHeight;

  setNewSize = size =>
    this.props.horizontal
      ? (this.curTarget.style.width = size)
      : (this.curTarget.style.height = size);

  onMouseDown = e => {
    e.stopPropagation();
    this.curTarget = this.props.horizontal
      ? e.target.parentElement
      : e.target.parentElement.parentElement;
    this.position = this.getPosition(e);
    const padding = paddingDiff(this.curTarget);
    this.curSize = this.getSize() - padding;
  };

  onMouseMove = e => {
    if (this.curTarget) {
      const diff = this.getPosition(e) - this.position;
      const newSize = this.curSize + diff;
      const { minSize = 0 } = this.props;
      if (newSize >= minSize) {
        this.setNewSize(newSize + 'px');
      }
    }
  };

  onMouseUp = () => {
    if (!this.props.disableResize && this.curTarget && this.position && this.curSize) {
      this.props.onResize(this.props.index, this.getSize());
      this.curTarget = undefined;
      this.position = undefined;
      this.curSize = undefined;
    }
  };

  getResizerStyle = () => {
    const { horizontal, highlightResizer, index, size } = this.props;
    const style = {};
    if (horizontal) {
      style.height = size;
      highlightResizer === index && (style.borderRight = RESIZER_STYLE);
    } else {
      style.width = size;
      highlightResizer === index && (style.borderBottom = RESIZER_STYLE);
    }
    return style;
  };
  render() {
    const resizerStyle = this.getResizerStyle();
    return (
      //eslint-disable-next-line
      <div
        className={classNames(
          styles.resizer,
          this.props.horizontal ? styles.horizonResizer : styles.verticalResizer
        )}
        style={{ ...resizerStyle }}
        onMouseDown={this.onMouseDown}
      />
    );
  }
}

Resizer.propTypes = {
  index: PropTypes.number.isRequired,
  size: PropTypes.number,
  onResize: PropTypes.func.isRequired,
  highlightResizer: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
  disableResize: PropTypes.bool,
  horizontal: PropTypes.bool,
  minSize: PropTypes.number,
};
