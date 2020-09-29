import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from '../../statics/styles/cell.scss';
import classNames from 'classnames';
import RowResizer from './RowResizer';
import ColResizer from './ColResizer';
import { TOOLBARS } from 'wix-rich-content-editor-common';
import { getCellBorderStyle, getRange, getCellContent } from '../tableUtils';
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

  setTdRef = ref => (this.tdRef = ref);
  setEditingToolbarRef = ref => (this.editingToolbarRef = ref);

  isToolbarOverflow = () => {
    if (this.tdRef && this.editingToolbarRef) {
      const cellOffsetLeft = this.tdRef.offsetLeft;
      const { row, col, cell, attributesRenderer } = this.props;
      const { offsetWidth } = attributesRenderer?.(cell, row, col) || {};
      const tableWidth = offsetWidth;
      const toolbarWidth = this.editingToolbarRef.offsetWidth;
      return cellOffsetLeft + toolbarWidth > tableWidth;
    }
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
      componentData,
    } = this.props;

    const { offsetHeight, offsetWidth, cellData = {}, onResize } =
      attributesRenderer?.(cell, row, col) || {};
    const { style: additionalStyles, merge = {} } = cellData;
    const { colSpan = 1, rowSpan = 1, child } = merge;
    const cellBorderStyle =
      selected && !editing ? getCellBorderStyle(selectedCells, row, col, '1px double #0261ff') : {}; //TODO: need to take real action color
    const contentState = getCellContent(componentData, row, col);
    const range = selectedCells && getRange(selectedCells);
    return child ? null : (
      //eslint-disable-next-line
      <td
        ref={this.setTdRef}
        className={classNames(
          selected && styles.selected,
          editing && styles.editing,
          styles.cell,
          range?.length === 1 && styles.multiSelection
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
          <div
            ref={this.setEditingToolbarRef}
            className={styles.editingToolbarWrapper}
            style={this.isToolbarOverflow() ? { right: 0 } : { left: 0 }}
          >
            <ExternalToolbar {...this.editorRef.getToolbarProps(TOOLBARS.FORMATTING)} theme={{}} />
          </div>
        )}
        <Editor
          editing={editing}
          selected={selected}
          contentState={contentState}
          setEditorRef={this.setEditorRef}
          readOnly={range?.length !== 1}
        >
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
        {onResize && row === 0 && (
          <ColResizer
            col={col}
            offsetHeight={offsetHeight}
            onResize={onResize.onResizeCol}
            highlightColResizer={highlightColResizer}
            disableResize={col === colNum - 1}
          />
        )}
      </td>
    );
  }
}

class Editor extends Component {
  shouldComponentUpdate(nextProps) {
    const { editing, selected, contentState } = this.props;
    const isContentStateChanged =
      JSON.stringify(contentState || {}) !== JSON.stringify(nextProps.contentState || {});
    return editing || nextProps.editing || selected || isContentStateChanged;
  }

  render() {
    const { children, setEditorRef, readOnly } = this.props;
    return (
      <div className={styles.editor}>
        {React.cloneElement(children, { ref: setEditorRef, readOnly })}
      </div>
    );
  }
}
Editor.propTypes = {
  setEditorRef: PropTypes.number.function,
  selected: PropTypes.bool,
  editing: PropTypes.bool,
  children: PropTypes.any,
  contentState: PropTypes.object,
  readOnly: PropTypes.bool,
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
  componentData: PropTypes.object,
};
