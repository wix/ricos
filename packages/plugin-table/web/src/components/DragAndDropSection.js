import React from 'react';
import { DragAndDropIcon, PlusIcon } from '../icons';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from '../../statics/styles/drag-and-drop.scss';
import ClickOutside from 'react-click-outside';

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

  render() {
    const { cellsNum, onPlusClick, isCol, selectAll, highlightResizer, onDrag, sizes } = this.props;
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
            draggable="true"
            onDragStart={e => {
              onDrag(i);
              this.setState({
                dragState: {
                  ...dragState,
                  startIndex: i,
                  startPoint: {
                    x: e.pageX,
                    y: e.pageY,
                  },
                },
              });
            }}
            onDragEnter={() => {
              highlightResizer(i, isCol);
              if (!dragState.isDragging && dragState.startIndex !== i) {
                this.setState({
                  dragState: { ...dragState, isDragging: true, dropIndex: i },
                });
                return;
              }

              if (dragState.isDragging) {
                if (i !== dragState.dropIndex) {
                  this.setState({
                    dragState: { ...dragState, dropIndex: i },
                  });
                }
                return;
              }
            }}
            onDragEnd={this.onDragEnd}
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
            //eslint-disable-next-line
            <div
              onMouseEnter={() => highlightResizer(i, isCol)}
              onMouseLeave={this.onMouseLeavePlus}
              className={classNames(styles.add, !isCol && styles.addRow)}
            >
              <PlusIcon onClick={() => onPlusClick(i + 1)} />
            </div>
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
