/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from '../../../statics/styles/table-toolbar.scss';
import { getRange } from '../../tableUtils';
import TextFormatting from './TextFormatting';
import { cloneDeep, isEmpty } from 'lodash';
import CellFormatting from './CellFormatting';
import ContextMenu from './ContextMenu';

class TableToolbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isTextFormattingOpen: false,
    };
  }

  componentDidUpdate(prevProps) {
    const { selected } = this.props;
    if (selected && JSON.stringify(prevProps.selected || {}) !== JSON.stringify(selected || {})) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ isTextFormattingOpen: false });
    }
  }

  excludeFormattingButtons = combinedToolbarProps => {
    const buttonsToExclude = ['LINK', 'CODE_BLOCK'];
    buttonsToExclude.forEach(button => {
      // eslint-disable-next-line fp/no-delete
      delete combinedToolbarProps.buttons[button];
    });
    return combinedToolbarProps;
  };

  combineRegularButtonsOnClick = (buttonsProps, cellsToolbarsProps, buttonKeyName) => {
    buttonsProps.onClick = args => {
      cellsToolbarsProps
        .map(toolbar => toolbar.buttons[buttonKeyName])
        .filter(button => buttonsProps.isActive() === button.isActive())
        .forEach(button => button.onClick(args));
    };
  };

  combineGroupButtonsOnClick = (buttonsProps, cellsToolbarsProps, buttonKeyName) => {
    Object.entries(buttonsProps.buttonList).forEach(([buttonListKey, buttonListValue]) => {
      buttonListValue.onClick = args => {
        cellsToolbarsProps.forEach(toolbarProp => {
          const currentListButton = toolbarProp.buttons[buttonKeyName].buttonList[buttonListKey];
          if (buttonListValue.isActive() === currentListButton.isActive()) {
            currentListButton.onClick(args);
          }
        });
      };
    });
  };

  combineDropdownButtonsOnSelect = (buttonsProps, cellsToolbarsProps, buttonKeyName) => {
    buttonsProps.onSelect = args => {
      cellsToolbarsProps
        .map(toolbar => toolbar.buttons[buttonKeyName])
        .forEach(button => button.onSelect(args));
    };
  };

  setToolbarProps = cellsToolbarsProps => {
    if (cellsToolbarsProps && cellsToolbarsProps.length > 0) {
      let combinedToolbarProps = cloneDeep({ ...cellsToolbarsProps[0] });
      Object.entries(combinedToolbarProps.buttons).forEach(([buttonKeyName, buttonsProps]) => {
        if (buttonsProps.type === 'button') {
          this.combineRegularButtonsOnClick(buttonsProps, cellsToolbarsProps, buttonKeyName);
        } else if (buttonsProps.type === 'GROUP') {
          this.combineGroupButtonsOnClick(buttonsProps, cellsToolbarsProps, buttonKeyName);
        } else if (buttonsProps.type === 'DROPDOWN') {
          this.combineDropdownButtonsOnSelect(buttonsProps, cellsToolbarsProps, buttonKeyName);
        }
      });
      combinedToolbarProps = this.excludeFormattingButtons(combinedToolbarProps);
      this.setState({ combinedToolbarProps });
    } else {
      this.setState({ combinedToolbarProps: null });
    }
  };

  getToolbarPosition = () => {
    const { getFirstCellRef, tableWidth } = this.props;
    const firstCellRef = getFirstCellRef();
    if (this.ToolbarWrapperRef && firstCellRef && tableWidth) {
      const extraTopOffset = firstCellRef.offsetTop === 20 ? 56 : 36;
      const top = `${firstCellRef.offsetTop - extraTopOffset}px`;
      const cellOffsetLeft = firstCellRef.offsetLeft;
      const toolbarWidth = this.ToolbarWrapperRef.offsetWidth;
      if (cellOffsetLeft + toolbarWidth > tableWidth) {
        return { top, right: 0 };
      } else {
        return { top, left: cellOffsetLeft - 19 };
      }
    }
  };

  toggleIsTextFormattingOpen = () => {
    const { isTextFormattingOpen } = this.state;
    this.setState({ isTextFormattingOpen: !isTextFormattingOpen }, this.forceUpdate);
  };

  setToolbarWrapperRef = ref => (this.ToolbarWrapperRef = ref);

  render() {
    const {
      table,
      selected,
      isEditingActive,
      addCol,
      addRow,
      innerEditorsRefs,
      deleteColumn,
      deleteRow,
      t,
      isMobile,
      settings,
      selectRows,
      selectCols,
      deleteBlock,
      isAllCellsSelected,
    } = this.props;
    const { isTextFormattingOpen } = this.state;
    const range = selected && getRange(selected);
    const selectedRows = range && table.getSelectedRows(range);
    const selectedCols = range && table.getSelectedCols(range);
    const shouldShowContextMenu = selectedRows || selectedCols || range?.length > 1;
    return !isEmpty(selected) ? (
      <div
        ref={this.setToolbarWrapperRef}
        className={styles.container}
        style={{
          visibility: isEditingActive ? 'hidden' : 'visible',
          ...this.getToolbarPosition(),
        }}
      >
        {this.state.combinedToolbarProps && isTextFormattingOpen && (
          <>
            <div className={styles.goBack} onClick={this.toggleIsTextFormattingOpen}>
              Go back
            </div>
            <div className={styles.toolbar}>
              <TextFormatting {...this.state.combinedToolbarProps} theme={{}} />
            </div>
          </>
        )}
        {!isTextFormattingOpen && (
          <>
            <div className={styles.toolbar} onClick={this.toggleIsTextFormattingOpen}>
              Text Style
            </div>
            <CellFormatting
              selected={selected}
              table={table}
              addCol={addCol}
              addRow={addRow}
              t={t}
              isMobile={isMobile}
              settings={settings}
              deleteBlock={deleteBlock}
              isAllCellsSelected={isAllCellsSelected}
            />
            <ContextMenu
              shouldShowContextMenu={shouldShowContextMenu}
              selected={selected}
              table={table}
              innerEditorsRefs={innerEditorsRefs}
              addCol={addCol}
              addRow={addRow}
              deleteColumn={deleteColumn}
              deleteRow={deleteRow}
              selectRows={selectRows}
              selectCols={selectCols}
            />
          </>
        )}
      </div>
    ) : null;
  }
}

TableToolbar.propTypes = {
  selected: PropTypes.object.isRequired,
  table: PropTypes.any,
  innerEditorsRefs: PropTypes.any,
  addCol: PropTypes.func.isRequired,
  addRow: PropTypes.func.isRequired,
  isEditingActive: PropTypes.bool,
  tableWidth: PropTypes.number,
  getFirstCellRef: PropTypes.func,
  deleteColumn: PropTypes.func,
  deleteRow: PropTypes.func,
  t: PropTypes.func,
  isMobile: PropTypes.bool,
  settings: PropTypes.object,
  selectRows: PropTypes.func,
  selectCols: PropTypes.func,
  deleteBlock: PropTypes.func,
  isAllCellsSelected: PropTypes.bool,
};

export default TableToolbar;
