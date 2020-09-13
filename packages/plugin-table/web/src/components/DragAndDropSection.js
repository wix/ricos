import React from 'react';
import { DragAndDropIcon } from '../icons';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from '../../statics/styles/drag-and-drop.scss';
import ClickOutside from 'react-click-outside';
import PlusCircle from './PlusCircle';

const defaultDragState = {
  isDragging: false,
  startIndex: -1,
  dropIndex: -1,
};
class DragAndDropSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dragState: defaultDragState,
    };
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

  onDragClick = i => {
    const activeDrag = this.shiftKey
      ? { start: this.state.activeDrag.start, end: i }
      : { start: i, end: i };
    this.props.onDragClick(activeDrag);
    this.setState({ activeDrag });
  };

  removeShiftKey = () => (this.shiftKey = null);

  setShiftKey = e => e.key === 'Shift' && (this.shiftKey = true);

  resetActiveDrag = () => !this.shiftKey && this.setState({ activeDrag: null });

  onDragEnd = () => {
    const { highlightResizer, isCol, onDragEnd } = this.props;
    const { dragState } = this.state;
    highlightResizer(false, isCol);
    onDragEnd(dragState.startIndex, dragState.dropIndex);
    this.setState({ dragState: defaultDragState });
    this.resetActiveDrag();
  };

  onMouseLeavePlus = () => this.props.highlightResizer(false, this.props.isCol);

  onDragMouseDown = (e, i) => {
    this.curDrag = e.target;
    this.startDragIndex = i;
  };

  onMouseMove = e => {
    if (this.curDrag) {
      this.props.onDrag(e, this.startDragIndex);
    }
  };

  onMouseUp = e => {
    if (this.curDrag) {
      const { highlightResizer, isCol, onDragEnd } = this.props;
      highlightResizer(false, isCol);
      this.resetActiveDrag();

      onDragEnd(e, this.startDragIndex);
      this.curDrag = undefined;
      this.startDragIndex = undefined;
    }
  };

  isActive = i =>
    (this.state.activeDrag?.start <= i && this.state.activeDrag?.end >= i) ||
    (this.state.activeDrag?.start >= i && this.state.activeDrag?.end <= i);

  render() {
    const { cellsNum, onPlusClick, isCol, selectAll, highlightResizer, sizes } = this.props;
    const { dragState } = this.state;
    return [...Array(cellsNum).fill(0)].map((drag, i) => {
      const additionalStyle = isCol ? { width: sizes[i] } : { height: sizes[i] };
      return (
        <div key={i} className={styles.container} style={additionalStyle}>
          <ClickOutside
            onClickOutside={this.resetActiveDrag}
            onClick={() => this.onDragClick(i)}
            className={classNames(
              styles.dragAndDrop,
              this.isActive(i) && styles.active,
              selectAll && styles.selectAll
            )}
            style={{
              opacity: dragState.isDragging ? (dragState.dropIndex === i ? 0.5 : 1) : 1,
            }}
            onMouseDown={e => this.onDragMouseDown(e, i)}
          >
            <DragAndDropIcon
              className={classNames(isCol && styles.col)}
              style={{
                visibility: !selectAll && this.isActive(i) && 'visible',
                cursor: dragState.isDragging ? 'grabbing' : 'grab',
              }}
            />
          </ClickOutside>
          {i < cellsNum - 1 && (
            <PlusCircle
              highlightResizer={highlightResizer}
              isCol={isCol}
              onClick={onPlusClick}
              index={i}
            />
          )}
        </div>
      );
    });
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
