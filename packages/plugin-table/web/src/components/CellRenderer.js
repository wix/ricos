import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from '../../statics/styles/cell.scss';
import classNames from 'classnames';
import RowResizer from './RowResizer';
import ColResizer from './ColResizer';
import { TOOLBARS } from 'wix-rich-content-editor-common';
import { getCellBorderStyle, getRange } from '../tableUtils';
import TextFormatting from './TableToolbar/TextFormatting';

export default class Cell extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCollapsed: true,
    };
  }

  setIsCollapsed = isCollapsed => {
    this.setState({ isCollapsed });
  };

  componentDidUpdate(prevProps) {
    if (!prevProps.editing && this.props.editing) {
      this.editorRef.focus();
      this.props.setEditingActive(true);
      this.contentBeforeEdit = prevProps.table.getCellContent(prevProps.row, prevProps.col);
    }
    if (prevProps.editing && !this.props.editing) {
      this.props.setEditingActive(false);
    }
    if (this.props.selected) {
      if (!this.props.editing) {
        this.editorRef.selectAllContent();
      }
      if (!prevProps.selected) {
        const { selectedCells } = this.props;
        selectedCells && getRange(selectedCells).length === 1 && this.editorRef.focus();
      }
    }
  }

  setEditorRef = ref => {
    const { setEditorRef, row, col } = this.props;
    this.editorRef = ref;
    setEditorRef && setEditorRef(ref, row, col);
  };

  setTdRef = ref => (this.tdRef = ref);
  setEditingToolbarRef = ref => (this.editingToolbarRef = ref);

  getToolbarPosition = () => {
    if (this.tdRef && this.editingToolbarRef) {
      const cellOffsetLeft = this.tdRef.offsetLeft;
      const tableWidth = this.props.offsetWidth;
      const toolbarWidth = this.editingToolbarRef.offsetWidth;
      if (cellOffsetLeft + toolbarWidth > tableWidth) {
        return { right: 0 };
      } else {
        return { left: 0 };
      }
    }
  };

  handleClipboardEvent = e => {
    const { editing, row, col, updateCellContent } = this.props;
    if (editing) {
      if (e.key === 'Backspace') {
        e.stopPropagation();
      } else if (e.key === 'a' && (e.ctrlKey || e.metaKey)) {
        e.stopPropagation();
        e.preventDefault();
        this.editorRef.selectAllContent(true);
      }
      if (e.key === 'Escape') {
        updateCellContent(row, col, this.contentBeforeEdit);
      }
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
      selectedCells,
      table,
      onResize,
      offsetHeight,
      offsetWidth,
    } = this.props;

    const { style: additionalStyles, merge = {} } = table.getCell(row, col);
    const { colSpan = 1, rowSpan = 1, child } = merge;
    const cellBorderStyle =
      selected && !editing ? getCellBorderStyle(selectedCells, row, col, '1px double #0261ff') : {}; //TODO: need to take real action color
    const contentState = table.getCellContent(row, col);
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
            style={{
              visibility: this.state.isCollapsed ? 'hidden' : 'visible',
              ...this.getToolbarPosition(),
            }}
          >
            <TextFormatting {...this.editorRef.getToolbarProps(TOOLBARS.FORMATTING)} theme={{}} />
          </div>
        )}
        <Editor
          editing={editing}
          selected={selected}
          contentState={contentState}
          setEditorRef={this.setEditorRef}
          setIsCollapsed={this.setIsCollapsed}
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
            disableResize={col === table.getColNum() - 1}
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
    const { children, setEditorRef, selected, editing, setIsCollapsed } = this.props;
    return (
      <div className={classNames(styles.editor, selected && !editing && styles.selected)}>
        {React.cloneElement(children, { ref: setEditorRef, setIsCollapsed })}
      </div>
    );
  }
}
Editor.propTypes = {
  setEditorRef: PropTypes.func,
  selected: PropTypes.bool,
  editing: PropTypes.bool,
  children: PropTypes.any,
  contentState: PropTypes.object,
  setIsCollapsed: PropTypes.func,
};
Cell.propTypes = {
  row: PropTypes.number.isRequired,
  col: PropTypes.number.isRequired,
  selected: PropTypes.bool,
  editing: PropTypes.bool,
  updated: PropTypes.bool,
  onMouseDown: PropTypes.func.isRequired,
  onMouseOver: PropTypes.func.isRequired,
  onDoubleClick: PropTypes.func.isRequired,
  onContextMenu: PropTypes.func.isRequired,
  style: PropTypes.object,
  children: PropTypes.any,
  setDragsVisibility: PropTypes.func,
  highlightColResizer: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
  highlightRowResizer: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
  table: PropTypes.object,
  setEditorRef: PropTypes.func,
  toolbarRef: PropTypes.any,
  selectedCells: PropTypes.object,
  setEditingActive: PropTypes.func,
  updateCellContent: PropTypes.func,
  onResize: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  offsetHeight: PropTypes.number,
  offsetWidth: PropTypes.number,
};
