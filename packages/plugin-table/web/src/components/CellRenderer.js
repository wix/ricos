import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from '../../statics/styles/cell.scss';
import classNames from 'classnames';
import { TOOLBARS, ToolbarContainer, Toolbar } from 'wix-rich-content-editor-common';
import { getCellBorderStyle, getRange } from '../tableUtils';
import { isNumber, cloneDeep } from 'lodash';

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
    if (
      !this.isEditing(prevProps.editing, prevProps.selectedCells) &&
      this.isEditing(this.props.editing, this.props.selectedCells)
    ) {
      this.editorRef.focus();
      this.props.setEditingActive(true);
      this.contentBeforeEdit = prevProps.table.getCellContent(prevProps.row, prevProps.col);
    }
    if (
      this.isEditing(prevProps.editing, prevProps.selectedCells) &&
      !this.isEditing(this.props.editing, this.props.selectedCells)
    ) {
      this.props.setEditingActive(false);
    }
    if (this.props.selected) {
      if (!this.isEditing(this.props.editing, this.props.selectedCells)) {
        this.editorRef?.selectAllContent();
      }
      if (!prevProps.selected) {
        const { selectedCells } = this.props;
        selectedCells && getRange(selectedCells).length === 1 && this.editorRef.focus();
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
  setEditingToolbarRef = ref => (this.editingToolbarRef = ref);

  getToolbarPosition = () => {
    if (this.tdRef && this.editingToolbarRef) {
      const cellOffsetLeft = this.tdRef.offsetLeft;
      const tableWidth = this.props.tableWidth;
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

  fixColorPickerButtons = toolbarButtons => {
    Object.values(toolbarButtons).forEach(buttonsProps => {
      if (buttonsProps.type === 'DROPDOWN') {
        buttonsProps.type = 'modal';
      }
    });
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
    } = this.props;

    const { style: additionalStyles, merge = {} } = table.getCell(row, col);
    const { colSpan = 1, rowSpan = 1, child } = merge;
    const isEditing = this.isEditing(editing, selectedCells);
    const cellBorderStyle =
      selected && !isEditing
        ? getCellBorderStyle(selectedCells, row, col, '1px double #0261ff')
        : {}; //TODO: need to take real action color
    const contentState = table.getCellContent(row, col);
    const range = selectedCells && getRange(selectedCells);
    const cellWidth = table.getColWidth(col);
    const width =
      isMobile && isNumber(cellWidth) ? table.getColWidth(col) * 0.8 : table.getColWidth(col);
    const toolbarButtons = cloneDeep(this.editorRef?.getToolbarProps(TOOLBARS.FORMATTING).buttons);
    toolbarButtons && this.fixColorPickerButtons(toolbarButtons);
    return child ? null : (
      //eslint-disable-next-line
      <td
        ref={this.setTdRef}
        className={classNames(
          styles.cell,
          selected && styles.selected,
          !isMobile && isEditing && styles.editing,
          range?.length === 1 && styles.multiSelection
        )}
        onMouseDown={onMouseDown}
        onMouseOver={onMouseOver}
        onDoubleClick={onDoubleClick}
        onTouchEnd={onDoubleClick}
        onContextMenu={onContextMenu}
        colSpan={colSpan}
        rowSpan={rowSpan}
        style={{
          ...style,
          ...(additionalStyles || {}),
          ...cellBorderStyle,
          width,
        }}
        data-row={row}
        data-col={col}
        onKeyDown={this.handleClipboardEvent}
      >
        {this.editorRef && isEditing && (
          <ToolbarContainer
            ref={this.setEditingToolbarRef}
            isVisible={!this.state.isCollapsed}
            toolbarPosition={this.getToolbarPosition()}
          >
            <Toolbar theme={{}} isMobile={isMobile} t={() => {}} buttons={toolbarButtons} />
          </ToolbarContainer>
        )}
        <Editor
          editing={isEditing}
          selected={selected}
          contentState={contentState}
          setEditorRef={this.setEditorRef}
          setIsCollapsed={this.setIsCollapsed}
        >
          {children}
        </Editor>
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
    const { children, setEditorRef, editing, setIsCollapsed } = this.props;
    return (
      <div className={classNames(styles.editor, editing && styles.editing)}>
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
  table: PropTypes.object,
  setEditorRef: PropTypes.func,
  toolbarRef: PropTypes.any,
  selectedCells: PropTypes.object,
  setEditingActive: PropTypes.func,
  updateCellContent: PropTypes.func,
  tableWidth: PropTypes.number,
  isMobile: PropTypes.bool,
};
