import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styles from '../../statics/styles/cell.scss';
import DragAndDropSection from './DragAndDropSection';
import Resizer from './Resizer';

export default class Rows extends PureComponent {
  render() {
    const { rowDragProps, index, resizeProps } = this.props;
    return (
      <td className={styles.rows} key={index}>
        <DragAndDropSection {...rowDragProps} index={index} />
        {resizeProps && <Resizer index={index} {...resizeProps} key={'resizer'} />}
      </td>
    );
  }
}

Rows.propTypes = {
  rowDragProps: PropTypes.object.isRequired,
  index: PropTypes.number,
  resizeProps: PropTypes.object,
};
