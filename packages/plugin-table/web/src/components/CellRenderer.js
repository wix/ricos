import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { setColListeners, setRowListeners } from '../table-resize';
import styles from '../../statics/styles/cell.scss';
import classNames from 'classnames';

export default class Cell extends PureComponent {
  getAttributes = () => {
    const { cell, row, col, attributesRenderer } = this.props;
    return attributesRenderer ? attributesRenderer(cell, row, col) : {};
  };

  setRowResizer = ref => {
    if (ref && !this.rowRef) {
      const {
        onResize: { onResizeRow },
      } = this.getAttributes();
      this.rowRef = ref;
      setRowListeners(ref, onResizeRow);
    }
  };
  setColResizer = ref => {
    if (ref && !this.colRef) {
      const {
        onResize: { onResizeCol },
      } = this.getAttributes();
      this.colRef = ref;
      setColListeners(ref, onResizeCol);
    }
  };

  render() {
    const {
      row,
      col,
      className,
      style,
      onMouseDown,
      onMouseOver,
      onDoubleClick,
      editing,
      onContextMenu,
      children,
    } = this.props;

    const { table = {}, cellData = {} } = this.getAttributes();
    const { style: additionalStyles, merge = {} } = cellData;
    const { offsetHeight, offsetWidth } = table;
    const { colSpan = 1, rowSpan = 1, child } = merge;
    return child ? null : (
      //eslint-disable-next-line
      <td
        className={classNames(className, styles.container)}
        onMouseDown={onMouseDown}
        onMouseOver={onMouseOver}
        onDoubleClick={onDoubleClick}
        onTouchEnd={onDoubleClick}
        onContextMenu={onContextMenu}
        colSpan={colSpan}
        rowSpan={rowSpan}
        style={{ ...style, ...(additionalStyles || {}) }}
        data-row={row}
        data-col={col}
      >
        <div style={{ pointerEvents: editing ? 'auto' : 'none' }}>{children}</div>
        {row === 0 && (
          <div
            className={styles.colResizer}
            style={{ height: offsetHeight }}
            ref={this.setColResizer}
          />
        )}
        {col === 0 && (
          <div
            className={styles.rowResizer}
            style={{ width: offsetWidth }}
            ref={this.setRowResizer}
          />
        )}
      </td>
    );
  }
}

Cell.propTypes = {
  row: PropTypes.number.isRequired,
  col: PropTypes.number.isRequired,
  selected: PropTypes.bool,
  editing: PropTypes.bool,
  updated: PropTypes.bool,
  attributesRenderer: PropTypes.func,
  onMouseDown: PropTypes.func.isRequired,
  onMouseOver: PropTypes.func.isRequired,
  onDoubleClick: PropTypes.func.isRequired,
  onContextMenu: PropTypes.func.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
  cell: PropTypes.object,
  children: PropTypes.any,
};
