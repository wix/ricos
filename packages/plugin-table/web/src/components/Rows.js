import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styles from '../../statics/styles/cell.scss';
import DragAndDropSection from './DragAndDropSection';
import Resizer from './Resizer';
import classNames from 'classnames';

export default class Rows extends PureComponent {
  render() {
    const { rowDragProps, index, resizeProps, activeDrag, selectAll } = this.props;
    return (
      <td
        className={classNames(
          styles.rows,
          selectAll && styles.selectAll,
          activeDrag?.includes(index) && styles.selected
        )}
      >
        <DragAndDropSection
          {...rowDragProps}
          index={index}
          activeDrag={activeDrag}
          selectAll={selectAll}
        />
        {resizeProps && <Resizer index={index} {...resizeProps} key={'resizer'} />}
      </td>
    );
  }
}

Rows.propTypes = {
  rowDragProps: PropTypes.object.isRequired,
  index: PropTypes.number,
  resizeProps: PropTypes.object,
  activeDrag: PropTypes.array,
  selectAll: PropTypes.bool,
};
