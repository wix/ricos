import React from 'react';
import { DragAndDropIcon } from '../icons';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from '../../statics/styles/drag-and-drop.scss';

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
        this.props.onDragEnd(e, this.drags);
        this.drags = null;
      }
    }
  };

  isActive = i => this.props.activeDrag?.includes(i);

  getSelectedPreviewStyle = () => {
    const { size, horizontal, index } = this.props;
    const selectPreviewStyle = { visibility: this.isActive(index) && 'visible' };
    if (horizontal) {
      selectPreviewStyle.height = size - 20;
      this.isActive(index + 1) && (selectPreviewStyle.borderRight = 'none');
      this.isActive(index - 1) && (selectPreviewStyle.borderLeft = 'none');
    } else {
      selectPreviewStyle.width = size - 20;
      this.isActive(index + 1) && (selectPreviewStyle.borderBottom = 'none');
      this.isActive(index - 1) && (selectPreviewStyle.borderTop = 'none');
    }
    return selectPreviewStyle;
  };

  render() {
    const { horizontal, selectAll, index } = this.props;
    const isActive = this.isActive(index);
    const selectPreviewStyle = this.getSelectedPreviewStyle();
    return (
      <div className={styles.container}>
        {/*eslint-disable-next-line*/}
        <div
          className={classNames(
            styles.dragAndDrop,
            isActive && styles.active,
            selectAll && styles.selectAll,
            this.isDragging && styles.dragging
          )}
          onMouseDown={e => this.onDragMouseDown(e, index)}
          data-hook={`${horizontal ? 'col' : 'row'}Drag-${index}`}
        >
          <DragAndDropIcon
            className={classNames(horizontal && styles.horizontal)}
            style={{
              visibility: !selectAll && isActive && 'visible',
              cursor: this.isDragging ? 'grabbing' : 'grab',
            }}
          />
        </div>
        <div
          className={classNames(styles.selectPreview, !horizontal && styles.vertical)}
          style={selectPreviewStyle}
        />
      </div>
    );
  }
}

DragAndDropSection.propTypes = {
  onDragClick: PropTypes.func.isRequired,
  horizontal: PropTypes.bool,
  selectAll: PropTypes.bool,
  onDragEnd: PropTypes.func.isRequired,
  onDrag: PropTypes.func.isRequired,
  activeDrag: PropTypes.array,
  index: PropTypes.number,
  size: PropTypes.number,
};

export default DragAndDropSection;
