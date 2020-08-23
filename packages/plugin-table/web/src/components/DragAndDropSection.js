import React from 'react';
import { DragAndDropIcon, PlusIcon } from '../icons';
import PropTypes from 'prop-types';

class DragAndDropSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  activateAdd = i => this.setState({ visibleAdd: i });
  render() {
    const { visibleDrag, styles, cellsNum, onDragClick, onPlusClick } = this.props;
    return (
      <div className={styles.cellsContainer}>
        {[...Array(cellsNum).fill(0)].map((drag, i) => (
          <div className={styles.cellController} key={i}>
            <DragAndDropIcon
              onClick={() => onDragClick(i)}
              style={{
                visibility: visibleDrag === i ? 'visible' : 'hidden',
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
          </div>
        ))}
      </div>
    );
  }
}

DragAndDropSection.propTypes = {
  visibleDrag: PropTypes.bool,
  styles: PropTypes.object.isRequired,
  cellsNum: PropTypes.number.isRequired,
  onDragClick: PropTypes.func.isRequired,
  onPlusClick: PropTypes.func.isRequired,
};

export default DragAndDropSection;
