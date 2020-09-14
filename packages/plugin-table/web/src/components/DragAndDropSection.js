import React from 'react';
import { DragAndDropIcon } from '../icons';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from '../../statics/styles/drag-and-drop.scss';
import PlusCircle from './PlusCircle';
import ClickOutside from 'react-click-outside';

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

  resetActiveDrag = () => this.setState({ activeDrag: null });

  onMouseLeavePlus = () => this.props.highlightResizer(false, this.props.isCol);

  onDragMouseDown = (e, i) => {
    this.curDrag = e.target;
    this.startPoint = this.getEventDiff(e);
    if (this.isActive(i)) {
      const { activeDrag } = this.state;
      this.props.onDragClick(activeDrag);
    } else {
      const activeDrag = {};
      if (this.shiftKey && this.state.activeDrag) {
        activeDrag.start = Math.min(i, this.state.activeDrag.start);
        activeDrag.end = Math.max(i, this.state.activeDrag.end);
      } else {
        activeDrag.start = i;
        activeDrag.end = i;
      }
      this.props.onDragClick(activeDrag);
      this.setState({ activeDrag });
    }
  };

  getEventDiff = e => (this.props.isCol ? e.pageX : e.pageY);

  onMouseMove = e => {
    const isDragging =
      this.curDrag && (this.isDragging || Math.abs(this.startPoint - this.getEventDiff(e)) > 25);
    if (isDragging) {
      this.isDragging = true;
      this.props.onDrag(e, this.state.activeDrag);
    }
  };

  onMouseUp = e => {
    if (this.curDrag) {
      this.curDrag = undefined;
      if (this.isDragging) {
        this.isDragging = undefined;
        const { highlightResizer, isCol, onDragEnd } = this.props;
        highlightResizer(false, isCol);
        onDragEnd(e, this.state.activeDrag);
        this.resetActiveDrag();
      }
    }
  };

  isActive = i =>
    (this.state.activeDrag?.start <= i && this.state.activeDrag?.end >= i) ||
    (this.state.activeDrag?.start >= i && this.state.activeDrag?.end <= i);

  render() {
    const { cellsNum, onPlusClick, isCol, selectAll, highlightResizer, sizes } = this.props;
    return (
      <ClickOutside onClickOutside={this.resetActiveDrag} className={styles.container}>
        {[...Array(cellsNum).fill(0)].map((drag, i) => {
          const additionalStyle = isCol ? { width: sizes[i] } : { height: sizes[i] };
          return (
            <div key={i} className={styles.drag} style={additionalStyle}>
              {/*eslint-disable-next-line*/}
              <div
                className={classNames(
                  styles.dragAndDrop,
                  this.isActive(i) && styles.active,
                  selectAll && styles.selectAll
                )}
                style={{
                  opacity: this.isDragging ? (this.dropIndex === i ? 0.5 : 1) : 1,
                }}
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
      </ClickOutside>
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
};

export default DragAndDropSection;
