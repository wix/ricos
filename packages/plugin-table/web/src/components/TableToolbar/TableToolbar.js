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
      toolbarProps: null,
    };
  }

  excludeFormattingButtons = combinedToolbarProps => {
    const buttonsToExclude = ['LINK', 'CODE_BLOCK'];
    buttonsToExclude.forEach(button => {
      // eslint-disable-next-line fp/no-delete
      delete combinedToolbarProps.buttons[button];
    });
    return combinedToolbarProps;
  };

  setFormattingButtonsInMore = combinedToolbarProps => {
    let moreButtons = {};
    const buttonsInMore = ['Lists', 'Indentation', 'LINE_SPACING'];
    buttonsInMore.forEach(button => {
      moreButtons = { ...moreButtons, [`${button}`]: combinedToolbarProps.buttons[button] };
      // eslint-disable-next-line fp/no-delete
      delete combinedToolbarProps.buttons[button];
    });
    return { ...combinedToolbarProps, moreButtons };
  };

  setToolbarProps = cellsToolbarsProps => {
    if (cellsToolbarsProps && cellsToolbarsProps.length > 0) {
      let combinedToolbarProps = cloneDeep({ ...cellsToolbarsProps[0] });
      Object.entries(combinedToolbarProps.buttons).forEach(([buttonKeyName, buttonsProps]) => {
        if (buttonsProps.type === 'button') {
          buttonsProps.onClick = args => {
            cellsToolbarsProps
              .map(toolbar => toolbar.buttons[buttonKeyName])
              .filter(button => buttonsProps.isActive() === button.isActive())
              .forEach(button => button.onClick(args));
          };
        } else if (buttonsProps.type === 'GROUP') {
          Object.entries(buttonsProps.buttonList).forEach(([buttonListKey, buttonListValue]) => {
            buttonListValue.onClick = args => {
              cellsToolbarsProps.forEach(toolbarProp => {
                if (
                  buttonListValue.isActive() ===
                  toolbarProp.buttons[buttonKeyName].buttonList[buttonListKey].isActive()
                ) {
                  toolbarProp.buttons[buttonKeyName].buttonList[buttonListKey].onClick(args);
                }
              });
            };
          });
        }
      });
      combinedToolbarProps = this.excludeFormattingButtons(combinedToolbarProps);
      combinedToolbarProps = this.setFormattingButtonsInMore(combinedToolbarProps);
      this.setState({ combinedToolbarProps });
    } else {
      this.setState({ combinedToolbarProps: null });
    }
  };

  getToolbarPosition = () => {
    const { getFirstCellRef, tableWidth } = this.props;
    const firstCellRef = getFirstCellRef();
    if (this.ToolbarWrapperRef && firstCellRef && tableWidth) {
      const extraTopOffset = firstCellRef.offsetTop === 0 ? 36 : 16;
      const top = `${firstCellRef.offsetTop - extraTopOffset}px`;
      const cellOffsetLeft = firstCellRef.offsetLeft;
      const toolbarWidth = this.ToolbarWrapperRef.offsetWidth;
      if (cellOffsetLeft + toolbarWidth > tableWidth) {
        return { top, right: 0 };
      } else {
        return { top, left: cellOffsetLeft };
      }
    }
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
    } = this.props;
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
        {this.state.combinedToolbarProps && (
          <div className={styles.toolbar}>
            <TextFormatting {...this.state.combinedToolbarProps} theme={{}} />
          </div>
        )}
        <CellFormatting selected={selected} table={table} addCol={addCol} addRow={addRow} />
        {shouldShowContextMenu && (
          <ContextMenu
            selected={selected}
            table={table}
            innerEditorsRefs={innerEditorsRefs}
            addCol={addCol}
            addRow={addRow}
            deleteColumn={deleteColumn}
            deleteRow={deleteRow}
          />
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
};

export default TableToolbar;
