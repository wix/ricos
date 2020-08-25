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
    const { cellsNum, onPlusClick, isCol, selectAll, highlightResizer } = this.props;
    return [...Array(cellsNum).fill(0)].map((drag, i) => (
      <div key={i} className={styles.container}>
        <ClickOutside
          onClickOutside={this.resetActiveDrag}
          className={classNames(
            styles.dragAndDrop,
            this.state.activeDrag === i && styles.active,
            selectAll && styles.selectAll
          )}
        >
          <DragAndDropIcon
            className={classNames(isCol && styles.col)}
            onClick={() => this.onDragClick(i)}
            style={{
              visibility: !selectAll && this.state.activeDrag === i && 'visible',
            }}
          />
        </ClickOutside>
        {i < cellsNum - 1 && (
          //eslint-disable-next-line
          <div
            onMouseEnter={() => highlightResizer(i, isCol)}
            onMouseLeave={() => highlightResizer(false, isCol)}
            className={classNames(styles.add, !isCol && styles.addRow)}
          >
            <PlusIcon onClick={() => onPlusClick(i + 1)} />
          </div>
        )}
      </div>
    ));
  }
}

DragAndDropSection.propTypes = {
  cellsNum: PropTypes.number.isRequired,
  onDragClick: PropTypes.func.isRequired,
  onPlusClick: PropTypes.func.isRequired,
  isCol: PropTypes.bool,
  selectAll: PropTypes.bool,
  highlightResizer: PropTypes.func.isRequired,
};

export default DragAndDropSection;
