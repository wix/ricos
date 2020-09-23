import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from '../../statics/styles/cell.scss';
import classNames from 'classnames';
import RowResizer from './RowResizer';
import ColResizer from './ColResizer';
import { TOOLBARS } from 'wix-rich-content-editor-common';
import { getCellBorderStyle, getRange } from '../tableUtils';
import ExternalToolbar from './ExternalToolbar/ExternalToolbar.jsx';

export default class Cell extends Component {
  componentDidUpdate(prevProps) {
    if (!prevProps.editing && this.props.editing) {
      this.editorRef.focus();
      this.props.setEditingActive(true);
    }
    if (prevProps.editing && !this.props.editing) {
      this.props.setEditingActive(false);
    }
    if (this.props.selected && !this.props.editing) {
      this.editorRef.selectAllContent();
    }
  }

  setEditorRef = ref => {
    const { setEditorRef, row, col } = this.props;
    this.editorRef = ref;
    setEditorRef && setEditorRef(ref, row, col);
  };

  handleClipboardEvent = e => {
    if (e.key === 'Backspace') {
      e.stopPropagation();
    } else if (this.props.editing && e.key === 'a' && (e.ctrlKey || e.metaKey)) {
      e.stopPropagation();
      e.preventDefault();
      this.editorRef.selectAllContent(true);
    }
  };

  render() {
    const {
      row,
      col,
      style,
      onMouseDown,
      onMouseOver,
      onDoubleClick,
      editing,
      onContextMenu,
      children,
      highlightColResizer,
      highlightRowResizer,
      selected,
      cell,
      attributesRenderer,
      colNum,
      selectedCells,
    } = this.props;

    const { offsetHeight, offsetWidth, cellData = {}, onResize } =
      attributesRenderer?.(cell, row, col) || {};
    const { style: additionalStyles, merge = {} } = cellData;
    const { colSpan = 1, rowSpan = 1, child } = merge;
    const cellBorderStyle =
      selected && !editing ? getCellBorderStyle(selectedCells, row, col, '1px double #0261ff') : {}; //TODO: need to take real action color
    return child ? null : (
      //eslint-disable-next-line
      <td
        className={classNames(
          selected && styles.selected,
          editing && styles.editing,
          styles.cell,
          selectedCells && getRange(selectedCells).length === 1 && styles.multiSelection
        )}
        onMouseDown={onMouseDown}
        onMouseOver={onMouseOver}
        onDoubleClick={onDoubleClick}
        onTouchEnd={onDoubleClick}
        onContextMenu={onContextMenu}
        colSpan={colSpan}
        rowSpan={rowSpan}
        style={{ ...style, ...(additionalStyles || {}), ...cellBorderStyle }}
        data-row={row}
        data-col={col}
        onKeyDown={this.handleClipboardEvent}
      >
        {this.editorRef && this.props.editing && (
          <ExternalToolbar
            {...this.editorRef.getToolbarProps(TOOLBARS.FORMATTING)}
            theme={{}}
            editingToolbar
          />
        )}
        <Editor editing={editing} selected={selected} setEditorRef={this.setEditorRef}>
          {children}
        </Editor>
        {onResize && col === 0 && (
          <RowResizer
            row={row}
            offsetWidth={offsetWidth}
            onResize={onResize.onResizeRow}
            highlightRowResizer={highlightRowResizer}
          />
        )}
        {onResize && row === 0 && col !== colNum - 1 && (
          <ColResizer
            col={col}
            offsetHeight={offsetHeight}
            onResize={onResize.onResizeCol}
            highlightColResizer={highlightColResizer}
          />
        )}
      </td>
    );
  }
}

class Editor extends Component {
  shouldComponentUpdate(nextProps) {
    const { editing, selected } = this.props;
    return editing || nextProps.editing || selected;
  }

  render() {
    const { children, setEditorRef } = this.props;
    return (
      <div className={styles.editor}>{React.cloneElement(children, { ref: setEditorRef })}</div>
    );
  }
}
Editor.propTypes = {
  setEditorRef: PropTypes.number.function,
  selected: PropTypes.bool,
  editing: PropTypes.bool,
  children: PropTypes.any,
};
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
  style: PropTypes.object,
  cell: PropTypes.object,
  children: PropTypes.any,
  setDragsVisibility: PropTypes.func,
  highlightColResizer: PropTypes.number || PropTypes.bool,
  highlightRowResizer: PropTypes.number || PropTypes.bool,
  colNum: PropTypes.number,
  setEditorRef: PropTypes.func,
  toolbarRef: PropTypes.func,
  selectedCells: PropTypes.object,
  setEditingActive: PropTypes.func,
};
