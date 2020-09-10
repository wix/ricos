import React from 'react';
import { DragAndDropIcon } from '../icons';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from '../../statics/styles/drag-and-drop.scss';
import ClickOutside from 'react-click-outside';
import PlusCircle from './PlusCircle';

const defaultDragState = {
  startPoint: null,
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
  }
  componentWillUnmount() {
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseup', this.onMouseUp);
  }

  onDragClick = i => {
    this.props.onDragClick(i);
    this.setState({ activeDrag: i });
  };

  resetActiveDrag = () => this.setState({ activeDrag: null });

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
              this.state.activeDrag === i && styles.active,
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
                visibility: !selectAll && this.state.activeDrag === i && 'visible',
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
