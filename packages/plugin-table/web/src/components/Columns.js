import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import DragAndDropSection from './DragAndDropSection';
import SelectTable from './SelectTable';
import Resizer from './Resizer';
import styles from '../../statics/styles/cell.scss';
import { CELL_MIN_WIDTH } from '../consts';
export default class Columns extends PureComponent {
  render() {
    const { selectAllProps, colNum, colDragProps, getColWidth, resizeProps } = this.props;
    return (
      <tr className={styles.columns}>
        <td style={{ width: 20 }} className={styles.columns}>
          <SelectTable {...selectAllProps} />
        </td>
        {[...Array(colNum).fill(0)].map((row, i) => (
          <td key={`column${i}`} className={styles.columns} style={{ width: getColWidth(i) }}>
            <DragAndDropSection {...colDragProps} horizontal cellsNum={colNum} index={i} />
            {resizeProps && (
              <Resizer
                {...resizeProps}
                horizontal
                minSize={CELL_MIN_WIDTH}
                index={i}
                disableResize={i === colNum - 1}
              />
            )}
          </td>
        ))}
      </tr>
    );
  }
}

Columns.propTypes = {
  selectAllProps: PropTypes.object,
  colDragProps: PropTypes.object,
  colNum: PropTypes.number.isRequired,
  getColWidth: PropTypes.func,
  resizeProps: PropTypes.object,
};
