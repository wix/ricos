import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styles from '../../statics/styles/cell.scss';
import DragAndDropSection from './DragAndDropSection';
import RowResizer from './RowResizer';

export default class Rows extends PureComponent {
  render() {
    const { rowDragProps, index, resizeProps } = this.props;
    return (
      <td className={styles.rows}>
        <DragAndDropSection {...rowDragProps} index={index} />
        {resizeProps && <RowResizer row={index} {...resizeProps} />}
      </td>
    );
  }
}

Rows.propTypes = {
  rowDragProps: PropTypes.object.isRequired,
  index: PropTypes.number,
  resizeProps: PropTypes.object,
};
