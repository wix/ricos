import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import DragAndDropSection from './DragAndDropSection';
import SelectTable from './SelectTable';
import Resizer from './Resizer';
import styles from '../../statics/styles/cell.scss';
import { CELL_MIN_WIDTH } from '../consts';
import classNames from 'classnames';
export default class Columns extends PureComponent {
  render() {
    const {
      selectAllProps,
      colNum,
      colDragProps,
      getColWidth,
      resizeProps,
      activeDrag,
      selectAll,
    } = this.props;
    return (
      <tr>
        <td className={classNames(styles.selectAll, selectAll && styles.selected)}>
          <SelectTable {...selectAllProps} />
        </td>
        {[...Array(colNum).fill(0)].map((row, i) => (
          <td
            key={`column${i}`}
            className={classNames(
              styles.columns,
              selectAll && styles.selectAll,
              activeDrag?.includes(i) && styles.selected
            )}
            style={{ width: getColWidth(i) }}
          >
            <DragAndDropSection
              {...colDragProps}
              horizontal
              cellsNum={colNum}
              index={i}
              activeDrag={activeDrag}
              selectAll={selectAll}
            />
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
  activeDrag: PropTypes.array,
  selectAll: PropTypes.bool,
};
