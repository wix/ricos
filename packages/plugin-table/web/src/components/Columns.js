import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import DragAndDropSection from './DragAndDropSection';
import Resizer from './Resizer';
import styles from '../../statics/styles/columns.scss';
import { CELL_MANUAL_MIN_WIDTH } from '../consts';
import classNames from 'classnames';
export default class Columns extends PureComponent {
  render() {
    const {
      colNum,
      colDragProps,
      activeDrag,
      selectAll,
      size,
      onResize,
      highlightResizer,
      onResizeStart,
      columnsRefs,
      tableOverflowWidth,
    } = this.props;
    return (
      <tr>
        {[...Array(colNum).fill(0)].map((row, i) => (
          <td
            key={`column${i}`}
            className={classNames(
              styles.container,
              selectAll && styles.selectAll,
              activeDrag?.includes(i) && styles.selected
            )}
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
                minSize={CELL_MANUAL_MIN_WIDTH}
                index={i}
                size={size}
                onResizeStart={onResizeStart}
                itemsRefs={columnsRefs}
                overflowWidth={tableOverflowWidth}
              />
            )}
          </td>
        ))}
      </tr>
    );
  }
}

Columns.propTypes = {
  colDragProps: PropTypes.object,
  colNum: PropTypes.number.isRequired,
  activeDrag: PropTypes.array,
  selectAll: PropTypes.bool,
  size: PropTypes.number,
  onResize: PropTypes.func,
  highlightResizer: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
  onResizeStart: PropTypes.func,
  columnsRefs: PropTypes.array,
  tableOverflowWidth: PropTypes.number,
};
