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
      colNum,
      colDragProps,
      getColWidth,
      activeDrag,
      selectAll,
      isAllCellsSelected,
      toggleAllCellsSelection,
      size,
      onResize,
      highlightResizer,
      onResizeStart,
    } = this.props;
    return (
      <tr>
        <td className={classNames(styles.selectAll, selectAll && styles.selected)}>
          <SelectTable isActive={isAllCellsSelected} onClick={toggleAllCellsSelection} />
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
              index={i}
              activeDrag={activeDrag}
              selectAll={selectAll}
              size={size}
            />
            {onResize && (
              <Resizer
                onResize={onResize}
                highlightResizer={highlightResizer}
                horizontal
                minSize={CELL_MIN_WIDTH}
                index={i}
                disableResize={i === colNum - 1}
                size={size}
                onResizeStart={onResizeStart}
              />
            )}
          </td>
        ))}
      </tr>
    );
  }
}

Columns.propTypes = {
  isAllCellsSelected: PropTypes.bool,
  toggleAllCellsSelection: PropTypes.func,
  colDragProps: PropTypes.object,
  colNum: PropTypes.number.isRequired,
  getColWidth: PropTypes.func,
  activeDrag: PropTypes.array,
  selectAll: PropTypes.bool,
  size: PropTypes.number,
  onResize: PropTypes.func,
  highlightResizer: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
  onResizeStart: PropTypes.func,
};
