import React from 'react';
import { DragAndDropIcon, PlusIcon } from '../icons';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from '../../statics/styles/drag-and-drop.scss';
import ClickOutside from 'react-click-outside';

class DragAndDropSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onDragClick = i => {
    this.props.onDragClick(i);
    this.setState({ activeDrag: i });
  };

  resetActiveDrag = () => this.setState({ activeDrag: null });

  activateAdd = i => this.setState({ visibleAdd: i });
  render() {
    const { visibleDrag, cellsNum, onPlusClick, dragAndDropIconStyle } = this.props;
    return [...Array(cellsNum).fill(0)].map((drag, i) => (
      <ClickOutside
        onClickOutside={this.resetActiveDrag}
        key={i}
        className={classNames(styles.container, this.state.activeDrag === i && styles.active)}
      >
        <DragAndDropIcon
          className={dragAndDropIconStyle}
          onClick={() => this.onDragClick(i)}
          style={{
            visibility: visibleDrag === i || this.state.activeDrag === i ? 'visible' : 'hidden',
          }}
        />
        {i < cellsNum - 1 && (
          //eslint-disable-next-line
          <div
            className={styles.add}
            onMouseOver={() => this.activateAdd(i)}
            onMouseLeave={() => this.activateAdd(undefined)}
          >
            <PlusIcon
              onClick={() => onPlusClick(i + 1)}
              style={{
                visibility: this.state.visibleAdd === i ? 'visible' : 'hidden',
              }}
            />
          </div>
        )}
      </ClickOutside>
    ));
  }
}

DragAndDropSection.propTypes = {
  visibleDrag: PropTypes.bool,
  cellsNum: PropTypes.number.isRequired,
  onDragClick: PropTypes.func.isRequired,
  dragAndDropIconStyle: PropTypes.any,
  onPlusClick: PropTypes.func.isRequired,
};

export default DragAndDropSection;
