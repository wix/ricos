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
    const isCellWasEditing = this.isEditing(prevProps.editing, prevProps.selectedCells);
    const isCellEditing = this.isEditing(this.props.editing, this.props.selectedCells);
    const isGoIntoEdit = !isCellWasEditing && isCellEditing;
    const isGoOutFromEdit = isCellWasEditing && !isCellEditing;
    const { selectedCells, isMobile, setEditingActive, toolbarRef } = this.props;
    if (isGoIntoEdit) {
      this.editorRef.focus();
      setEditingActive(true);
      this.selectCellContent();
    } else if (isGoOutFromEdit) {
      setEditingActive(false);
      toolbarRef?.setEditingTextFormattingToolbarProps(false);
      this.selectCellContent();
    }
    if (this.props.selected && !prevProps.selected && !isCellEditing && !isMobile) {
      this.selectCellContent();
      selectedCells && getRange(selectedCells).length === 1 && this.editorRef?.focus();
      this.tdHeight = this.tdRef?.offsetHeight - 1;
    }
  }

  selectCellContent = () => {
    const { row, col, selectCellContent, isMobile } = this.props;
    !isMobile && selectCellContent?.(row, col);
  };

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
      }
      const shouldCreateNewLine = e.key === 'Enter' && (e.altKey || e.shiftKey || e.metaKey);
      if (!tableKeysToIgnoreOnEdit.includes(e.key) && !shouldCreateNewLine) {
        onKeyDown(e);
      }
    } else if (!editing && tableKeysToIgnoreOnEdit.includes(e.key)) {
      onKeyDown(e);
      e.stopPropagation();
      e.preventDefault();
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

  hideBlocks = () => {
    const { row, col, table, setEditorRef } = this.props;
    const editorState = table.getCellContent(row, col);
    const blocks = setEditorRef
      ? editorState.getCurrentContent().getBlocksAsArray()
      : editorState.blocks;
    if (blocks.length >= 3) {
      let lastBlockText;
      let firstBlockText;
      if (setEditorRef) {
        const currentContent = editorState.getCurrentContent();
        lastBlockText = currentContent.getLastBlock().getText();
        firstBlockText = currentContent.getFirstBlock().getText();
      } else {
        lastBlockText = blocks[blocks.length - 1].text;
        firstBlockText = blocks[0].text;
      }
      const hideFirstBlock = firstBlockText === '' || firstBlockText === '​'; //zero-width space
      const hideLastBlock = lastBlockText === '' || lastBlockText === '​'; //zero-width space
      return { hideFirstBlock, hideLastBlock };
    } else {
      return {};
    }
  };

  onCellClick = () => this.props.isMobile && this.props.onDoubleClick();

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
      setEditorRef,
      selectCellContent,
    } = this.props;
    const { style: additionalStyles = {}, merge = {}, border = {} } = table.getCell(row, col) || {};
    const { colSpan = 1, rowSpan = 1, parentCellKey } = merge;
    const isEditing = this.isEditing(editing, selectedCells);
    const shouldShowSelectedStyle = selected && !disableSelectedStyle && !isEditing;
    const range = selectedCells && getRange(selectedCells);
    const cellBorders = this.getCellBorders(border, shouldShowSelectedStyle);
    const isContainedInHeader = table.isCellContainedInHeader(row, col);
    const Tag = isContainedInHeader ? 'th' : 'td';
    const editorState = this.editorRef && isEditing && table.getCellContent(row, col);
    const Selection = editorState && editorState.getSelection();
    const cellContentContainText = editorState
      ? editorState
          .getCurrentContent()
          .getBlockMap()
          .filter(x => x.getType() === 'unstyled')
          .some(x => x.getText() !== '' && x.getText() !== '​') //zero-width space
      : false;
    const showFormattingToolbar =
      this.editorRef &&
      isEditing &&
      ((!Selection.isCollapsed() && Selection.getHasFocus()) ||
        (document && document.querySelector('[data-id="rich-content-editor-modal"]'))) &&
      cellContentContainText;
    if (showFormattingToolbar) {
      const toolbarButtons = cloneDeep(this.editorRef?.getToolbarProps?.(ToolbarType.FORMATTING));
      toolbarButtons && this.fixReactModalButtons(toolbarButtons);
      this.props.toolbarRef?.setEditingTextFormattingToolbarProps(toolbarButtons);
    } else if (isEditing) {
      this.props.toolbarRef?.setEditingTextFormattingToolbarProps(false);
    }
    const editorWrapperStyle = this.getEditorWrapperStyle(additionalStyles, isEditing);
    const { hideFirstBlock, hideLastBlock } = this.hideBlocks();
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
        onClick={this.onCellClick}
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
            setEditorRef ? styles.editorWrapper : styles.viewerWrapper,
            !isEditing && hideFirstBlock && styles.hideFirstBlock,
            !isEditing && hideLastBlock && styles.hideLastBlock,
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
            isEditor={selectCellContent}
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
    const isContentStateChanged = contentState !== nextProps.contentState;
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
  selectCellContent: PropTypes.func,
};
