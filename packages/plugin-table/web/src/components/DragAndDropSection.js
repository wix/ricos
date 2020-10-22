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

  onMouseLeavePlus = () => this.props.highlightResizer(false, this.props.horizontal);

  onDragMouseDown = (e, i) => {
    this.curDrag = e.target;
    this.startPoint = this.getEventDiff(e);
    if (this.isActive(i)) {
      this.clickedOnActiveDrag = true;
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

  getEventDiff = e => (this.props.horizontal ? e.pageX : e.pageY);

  onMouseMove = e => {
    const isDragging =
      this.curDrag && (this.isDragging || Math.abs(this.startPoint - this.getEventDiff(e)) > 25);
    if (isDragging) {
      this.isDragging = true;
      this.props.onDrag(e, this.drags);
    }
  };

  onMouseUp = e => {
    if (this.clickedOnActiveDrag) {
      this.props.onDragClick();
      this.clickedOnActiveDrag = false;
    }
    if (this.curDrag) {
      this.curDrag = undefined;
      if (this.isDragging) {
        this.isDragging = undefined;
        const { highlightResizer, horizontal, onDragEnd } = this.props;
        highlightResizer(false, horizontal);
        onDragEnd(e, this.drags);
        this.drags = null;
      }
    }
  };

  isActive = i => this.props.activeDrag?.includes(i);

  render() {
    const { cellsNum, onPlusClick, horizontal, selectAll, highlightResizer, index } = this.props;
    return (
      <div className={styles.container}>
        {/*eslint-disable-next-line*/}
        <div
          className={classNames(
            styles.dragAndDrop,
            this.isActive(index) && styles.active,
            selectAll && styles.selectAll,
            this.isDragging && styles.dragging
          )}
          onMouseDown={e => this.onDragMouseDown(e, index)}
          data-hook={`${horizontal ? 'col' : 'row'}Drag-${index}`}
        >
          <DragAndDropIcon
            className={classNames(horizontal && styles.horizontal)}
            style={{
              visibility: !selectAll && this.isActive(index) && 'visible',
              cursor: this.isDragging ? 'grabbing' : 'grab',
            }}
          />
        </div>
        {index < cellsNum - 1 &&
          !this.isDragging &&
          !this.isActive(index) &&
          !this.isActive(index + 1) && (
            <PlusCircle
              highlightResizer={highlightResizer}
              horizontal={horizontal}
              onClick={onPlusClick}
              index={index}
            />
          )}
      </div>
    );
  }
}

DragAndDropSection.propTypes = {
  cellsNum: PropTypes.number,
  onDragClick: PropTypes.func.isRequired,
  onPlusClick: PropTypes.func.isRequired,
  horizontal: PropTypes.bool,
  selectAll: PropTypes.bool,
  highlightResizer: PropTypes.func.isRequired,
  onDragEnd: PropTypes.func.isRequired,
  onDrag: PropTypes.func.isRequired,
  activeDrag: PropTypes.array,
  index: PropTypes.number,
};

export default DragAndDropSection;
