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

  render() {
    const { cellsNum, onPlusClick, isCol, selectAll } = this.props;
    return [...Array(cellsNum).fill(0)].map((drag, i) => (
      <ClickOutside
        onClickOutside={this.resetActiveDrag}
        key={i}
        className={classNames(
          styles.container,
          this.state.activeDrag === i && styles.active,
          selectAll && styles.selectAll
        )}
        onClick={() => this.onDragClick(i)}
      >
        <DragAndDropIcon
          className={classNames(isCol && styles.col)}
          style={{
            visibility: !selectAll && this.state.activeDrag === i && 'visible',
          }}
        />
        {i < cellsNum - 1 && (
          //eslint-disable-next-line
          <div className={classNames(styles.add, !isCol && styles.addRow)}>
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
  selectAll: PropTypes.bool,
};

export default DragAndDropSection;
