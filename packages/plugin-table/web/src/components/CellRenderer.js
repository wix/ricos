/* eslint-disable complexity */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from '../../statics/styles/cell.scss';
import classNames from 'classnames';
import { getRange } from '../domain/tableDataUtil';
import { cloneDeep } from 'lodash';
import CellBorders from './CellBorders';
import { ToolbarType } from 'wix-rich-content-common';

const tableKeysToIgnoreOnEdit = ['ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown'];
export default class Cell extends Component {
  componentDidUpdate(prevProps) {
    if (
      !this.isEditing(prevProps.editing, prevProps.selectedCells) &&
      this.isEditing(this.props.editing, this.props.selectedCells)
    ) {
      this.editorRef.focus();
      this.props.setEditingActive(true);
      !this.props.isMobile && this.editorRef?.selectAllContent(true);
      this.tdHeight = this.tdRef?.offsetHeight - 1;
    }
    if (
      this.isEditing(prevProps.editing, prevProps.selectedCells) &&
      !this.isEditing(this.props.editing, this.props.selectedCells)
    ) {
      this.props.setEditingActive(false);
      this.props.toolbarRef?.setEditingTextFormattingToolbarProps(false);
    }
    if (this.props.selected) {
      if (!this.isEditing(this.props.editing, this.props.selectedCells) && !this.props.isMobile) {
        !this.props.isMobile && this.editorRef?.selectAllContent();
      }
      if (!prevProps.selected) {
        const { selectedCells } = this.props;
        selectedCells && getRange(selectedCells).length === 1 && this.editorRef?.focus();
      }
    }
  }

  isSingleCellSelected = (selectedCells = {}) =>
    selectedCells?.start?.i === selectedCells?.end?.i &&
    selectedCells?.start?.j === selectedCells?.end?.j;

  isEditing = (editing, selectedCells) => editing && this.isSingleCellSelected(selectedCells);

  setEditorRef = ref => {
    const { setEditorRef, row, col } = this.props;
    this.editorRef = ref;
    setEditorRef && setEditorRef(ref, row, col);
  };

  setTdRef = ref => (this.tdRef = ref);

  getToolbarPosition = () => {
    if (this.tdRef) {
      const cellOffsetLeft = this.tdRef.offsetLeft;
      const tableWidth = this.props.tableWidth;
      return {
        x: 0,
        containerWidth: tableWidth,
        offsetLeftInsideContainer: cellOffsetLeft,
      };
    }
  };

  onKeydown = e => {
    const { editing, onKeyDown, isMobile } = this.props;
    if (editing && !isMobile) {
      if (e.key === 'Backspace') {
        e.stopPropagation();
      } else if (e.key === 'a' && (e.ctrlKey || e.metaKey)) {
        e.stopPropagation();
        e.preventDefault();
        this.editorRef.selectAllContent(true);
      } else if (e.key === 'Enter' && !(e.ctrlKey || e.metaKey || e.shiftKey)) {
        e.preventDefault();
      } else if (e.key === 'v' && (e.ctrlKey || e.metaKey || e.shiftKey)) {
        e.preventDefault();
      }
      const shouldCreateNewLine = e.key === 'Enter' && (e.ctrlKey || e.metaKey || e.shiftKey);
      if (!tableKeysToIgnoreOnEdit.includes(e.key) && !shouldCreateNewLine) {
        onKeyDown(e);
      }
    }
  };

  fixReactModalButtons = toolbarButtons => {
    Object.values(toolbarButtons).forEach(buttonsProps => {
      if (buttonsProps.type === 'DROPDOWN') {
        buttonsProps.type = 'modal';
      }
    });
  };

  getEditorWrapperStyle = (additionalStyles, isEditing) => {
    const shouldSetEditStyle = !this.props.isMobile && isEditing;
    const style = shouldSetEditStyle ? { minHeight: this.tdHeight, ...additionalStyles } : {};
    const { verticalAlign } = additionalStyles;
    if (shouldSetEditStyle && verticalAlign) {
      style.display = 'flex';
      if (verticalAlign === 'middle') {
        style.alignItems = 'center';
      } else if (verticalAlign === 'bottom') {
        style.alignItems = 'flex-end';
      }
    }
    return style;
  };

  getCellBorders = (cellBorders, shouldShowSelectedStyle) => {
    const { table, selectedCells, row, col, disableSelectedStyle, isMobile, selected } = this.props;
    const cellSelectionBorders = table.getCellBorders(selectedCells, row, col);
    let borders = {};
    if (disableSelectedStyle && selected) {
      Object.entries(cellBorders).forEach(([key, val]) => {
        !cellSelectionBorders[key] && (borders[key] = val);
      });
    } else {
      borders = cellBorders;
    }
    return !isMobile && shouldShowSelectedStyle ? { ...borders, ...cellSelectionBorders } : borders;
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
      selected,
      selectedCells,
      table,
      isMobile,
      disableSelectedStyle,
    } = this.props;
    // console.log(row, col, table.componentData, table.getCell(row, col));
    const { style: additionalStyles = {}, merge = {}, border = {} } = table.getCell(row, col) || {};
    const { colSpan = 1, rowSpan = 1, parentCellKey } = merge;
    const isEditing = this.isEditing(editing, selectedCells);
    const shouldShowSelectedStyle = selected && !disableSelectedStyle && !isEditing;
    const range = selectedCells && getRange(selectedCells);
    const cellBorders = this.getCellBorders(border, shouldShowSelectedStyle);
    const toolbarButtons = cloneDeep(this.editorRef?.getToolbarProps?.(ToolbarType.FORMATTING));
    toolbarButtons && this.fixReactModalButtons(toolbarButtons);
    const isContainedInHeader = table.isCellContainedInHeader(row, col);
    const Tag = isContainedInHeader ? 'th' : 'td';
    const Selection = this.editorRef && isEditing && table.getCellContent(row, col).getSelection();
    const showFormattingToolbar =
      this.editorRef &&
      isEditing &&
      ((!Selection.isCollapsed() && Selection.getHasFocus()) ||
        (document && document.querySelector('[data-id="rich-content-editor-modal"]')));
    if (showFormattingToolbar) {
      this.props.toolbarRef?.setEditingTextFormattingToolbarProps(toolbarButtons);
    } else if (isEditing) {
      this.props.toolbarRef?.setEditingTextFormattingToolbarProps(false);
    }
    const editorWrapperStyle = this.getEditorWrapperStyle(additionalStyles, isEditing);
    return parentCellKey ? null : (
      //eslint-disable-next-line
      <Tag
        data-hook={'table-plugin-cell'}
        ref={this.setTdRef}
        className={classNames(
          styles.cell,
          isContainedInHeader && styles.header,
          shouldShowSelectedStyle && !isEditing && styles.selected
        )}
        onMouseDown={onMouseDown}
        onMouseOver={onMouseOver}
        onDoubleClick={onDoubleClick}
        onContextMenu={onContextMenu}
        colSpan={colSpan}
        rowSpan={rowSpan}
        style={{
          ...style,
          ...additionalStyles,
        }}
        onKeyDown={this.onKeydown}
      >
        <div
          className={classNames(
            !isMobile && isEditing && styles.editing,
            !isEditing && styles.disableSelection
          )}
          style={editorWrapperStyle}
        >
          <Editor
            editing={isMobile ? selected : isEditing}
            selected={selected}
            contentState={table.getCellContent(row, col)}
            setEditorRef={this.setEditorRef}
          >
            {children}
          </Editor>
        </div>
        <CellBorders borders={cellBorders} />
        <div
          style={{
            height: shouldShowSelectedStyle ? this.tdRef?.offsetHeight : 0,
          }}
          className={classNames(
            shouldShowSelectedStyle && styles.selected,
            range?.length === 1 && styles.singleSelection
          )}
        />
      </Tag>
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

  setEditorRef = ref => {
    this.editor = ref;
    this.props.setEditorRef(ref);
  };

  render() {
    const { children, editing, selected } = this.props;
    return (
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions
      <div className={classNames(styles.editor, editing ? styles.edit : styles.view)}>
        {React.cloneElement(children, {
          ref: this.setEditorRef,
          editing,
          readOnly: !editing && !selected,
        })}
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
  setIsHighlighted: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
};
Cell.propTypes = {
  t: PropTypes.func,
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
  table: PropTypes.object,
  setEditorRef: PropTypes.func,
  toolbarRef: PropTypes.any,
  selectedCells: PropTypes.object,
  setEditingActive: PropTypes.func,
  tableWidth: PropTypes.number,
  isMobile: PropTypes.bool,
  disableSelectedStyle: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  onKeyDown: PropTypes.func,
};
