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
    const { cellsNum, onPlusClick, isCol } = this.props;
    return [...Array(cellsNum).fill(0)].map((drag, i) => (
      <ClickOutside
        onClickOutside={this.resetActiveDrag}
        key={i}
        className={classNames(styles.container, this.state.activeDrag === i && styles.active)}
        onClick={() => this.onDragClick(i)}
      >
        <DragAndDropIcon
          className={classNames(isCol && styles.col)}
          style={{
            visibility: this.state.activeDrag === i && 'visible',
          }}
        />
        {i < cellsNum - 1 && (
          //eslint-disable-next-line
          <div
            className={classNames(styles.add, !isCol && styles.addRow)}
            onMouseOver={() => this.activateAdd(i)}
            onMouseLeave={() => this.activateAdd(undefined)}
          >
            <PlusIcon onClick={() => onPlusClick(i + 1)} />
          </div>
        )}
      </ClickOutside>
    ));
  }
}

DragAndDropSection.propTypes = {
  cellsNum: PropTypes.number.isRequired,
  onDragClick: PropTypes.func.isRequired,
  onPlusClick: PropTypes.func.isRequired,
  isCol: PropTypes.bool,
};

export default DragAndDropSection;
