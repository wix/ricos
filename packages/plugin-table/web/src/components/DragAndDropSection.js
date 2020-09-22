import React from 'react';
import { DragAndDropIcon } from '../icons';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from '../../statics/styles/drag-and-drop.scss';
import PlusCircle from './PlusCircle';

class DragAndDropSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup', this.onMouseUp);
    document.addEventListener('keydown', this.setShiftKey);
    document.addEventListener('keyup', this.removeShiftKey);
  }
  componentWillUnmount() {
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseup', this.onMouseUp);
    document.removeEventListener('keydown', this.setShiftKey);
    document.removeEventListener('keyup', this.removeShiftKey);
  }

  removeShiftKey = () => (this.shiftKey = false);

  setShiftKey = e => e.key === 'Shift' && (this.shiftKey = true);

  onMouseLeavePlus = () => this.props.highlightResizer(false, this.props.isCol);

  onDragMouseDown = (e, i) => {
    this.curDrag = e.target;
    this.startPoint = this.getEventDiff(e);
    if (this.isActive(i)) {
      this.props.onDragClick();
    } else {
      const activeDrag = {};
      if (this.shiftKey && this.props.activeDrag) {
        activeDrag.start = Math.min(i, this.props.activeDrag[0]);
        activeDrag.end = Math.max(i, this.props.activeDrag[this.props.activeDrag.length - 1]);
      } else {
        activeDrag.start = i;
        activeDrag.end = i;
      }
      this.props.onDragClick(activeDrag);
      this.drags = activeDrag;
    }
  };

  getEventDiff = e => (this.props.isCol ? e.pageX : e.pageY);

  onMouseMove = e => {
    const isDragging =
      this.curDrag && (this.isDragging || Math.abs(this.startPoint - this.getEventDiff(e)) > 25);
    if (isDragging) {
      this.isDragging = true;
      this.props.onDrag(e, this.drags);
    }
  };

  onMouseUp = e => {
    if (this.curDrag) {
      this.curDrag = undefined;
      if (this.isDragging) {
        this.isDragging = undefined;
        const { highlightResizer, isCol, onDragEnd } = this.props;
        highlightResizer(false, isCol);
        onDragEnd(e, this.drags);
        this.drags = null;
      }
    }
  };

  isActive = i => this.props.activeDrag?.includes(i);

  render() {
    const { cellsNum, onPlusClick, isCol, selectAll, highlightResizer, sizes } = this.props;
    return (
      <div className={styles.container}>
        {[...Array(cellsNum).fill(0)].map((drag, i) => {
          const padding = isCol ? 2 : 1;
          const currSize = this.isActive(i) ? sizes[i] + padding : sizes[i];
          const additionalStyle = isCol ? { width: currSize } : { height: currSize };
          return (
            <div key={i} className={styles.drag} style={additionalStyle}>
              {/*eslint-disable-next-line*/}
              <div
                className={classNames(
                  styles.dragAndDrop,
                  this.isActive(i) && styles.active,
                  selectAll && styles.selectAll
                )}
                onMouseDown={e => this.onDragMouseDown(e, i)}
              >
                <DragAndDropIcon
                  className={classNames(isCol && styles.col)}
                  style={{
                    visibility: !selectAll && this.isActive(i) && 'visible',
                    cursor: this.isDragging ? 'grabbing' : 'grab',
                  }}
                />
              </div>
              {i < cellsNum - 1 && !this.isDragging && (
                <PlusCircle
                  highlightResizer={highlightResizer}
                  isCol={isCol}
                  onClick={onPlusClick}
                  index={i}
                />
              )}
            </div>
          );
        })}
      </div>
    );
  }
}

DragAndDropSection.propTypes = {
  cellsNum: PropTypes.number.isRequired,
  onDragClick: PropTypes.func.isRequired,
  onPlusClick: PropTypes.func.isRequired,
  isCol: PropTypes.bool,
  selectAll: PropTypes.bool,
  highlightResizer: PropTypes.func.isRequired,
  onDragEnd: PropTypes.func.isRequired,
  onDrag: PropTypes.func.isRequired,
  sizes: PropTypes.array,
  activeDrag: PropTypes.number,
};

export default DragAndDropSection;
