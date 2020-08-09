import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { setListeners } from '../table-resize';
export default class Cell extends PureComponent {
  render() {
    const {
      cell,
      row,
      col,
      className,
      style,
      onMouseDown,
      onMouseOver,
      onDoubleClick,
      onContextMenu,
      children,
      attributesRenderer,
    } = this.props;

    const { colSpan, rowSpan } = cell;
    const attributes = attributesRenderer ? attributesRenderer(cell, row, col) : {};
    return (
      //eslint-disable-next-line
      <td
        className={className}
        onMouseDown={onMouseDown}
        onMouseOver={onMouseOver}
        onDoubleClick={onDoubleClick}
        onTouchEnd={onDoubleClick}
        onContextMenu={onContextMenu}
        colSpan={colSpan}
        rowSpan={rowSpan}
        style={{ ...style, ...attributes.additionalStyles, position: 'relative' }}
        data-row={row}
        data-col={col}
      >
        {children}
        {row === 0 && (
          <div
            style={{
              top: 0,
              right: 0,
              width: 5,
              position: 'absolute',
              cursor: 'col-resize',
              height: attributes.tableHeight,
              zIndex: 1,
            }}
            ref={ref => ref && setListeners(ref)}
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
