/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from '../../../statics/styles/table-toolbar.scss';
import { getRange } from '../../tableUtils';
import { cloneDeep, isEmpty } from 'lodash';
import { ToolbarContainer, Toolbar } from 'wix-rich-content-editor-common';
import { getCellFormattingButtonsProps } from './CellFormattingButtonProps';
import { getContextMenuButtonsProps } from './ContextMenuButtonProps';

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
          buttonsProps.type = 'modal';
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
      const extraTopOffset = firstCellRef.offsetTop === 20 ? 60 : 41;
      const top = `${firstCellRef.offsetTop - extraTopOffset}px`;
      const cellOffsetLeft = firstCellRef.offsetLeft;
      const toolbarWidth = this.ToolbarWrapperRef.wrapperRef.offsetWidth;
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

  renderMainToolbar = () => {
    const {
      table,
      selected,
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
    const range = selected && getRange(selected);
    const selectedRows = range && table.getSelectedRows(range);
    const selectedCols = range && table.getSelectedCols(range);
    const shouldShowContextMenu = selectedRows || selectedCols || range?.length > 1;
    const cellFormattingButtonsProps = getCellFormattingButtonsProps(
      selected,
      settings,
      table,
      isAllCellsSelected,
      deleteBlock
    );
    const contextMenuButtonsProps = getContextMenuButtonsProps(
      shouldShowContextMenu,
      table,
      innerEditorsRefs,
      selected,
      deleteRow,
      addRow,
      deleteColumn,
      addCol,
      selectRows,
      selectCols
    );
    const buttons = {
      //noam switch to array
      TextStyle: {
        onClick: this.toggleIsTextFormattingOpen,
        dataHook: 'text-style',
        text: 'Text Style',
        type: 'text',
      },
      Gap: {
        type: 'gap',
      },
      ...cellFormattingButtonsProps,
      Gap2: {
        type: 'gap',
      },
      ...contextMenuButtonsProps,
    };
    return <Toolbar theme={{}} isMobile={isMobile} t={t} buttons={buttons} />;
  };

  renderTextFormattingToolbar = () => {
    const { isMobile, t } = this.props;
    return (
      <>
        <div className={styles.goBack} onClick={this.toggleIsTextFormattingOpen}>
          Go back
        </div>
        <Toolbar
          theme={{}}
          isMobile={isMobile}
          t={t}
          buttons={this.state.combinedToolbarProps.buttons}
        />
      </>
    );
  };

  render() {
    const { selected, isEditingActive } = this.props;
    const { isTextFormattingOpen, combinedToolbarProps } = this.state;
    return !isEmpty(selected) ? (
      <ToolbarContainer
        ref={this.setToolbarWrapperRef}
        isVisible={!isEditingActive}
        toolbarPosition={this.getToolbarPosition()}
      >
        {combinedToolbarProps && isTextFormattingOpen && this.renderTextFormattingToolbar()}
        {!isTextFormattingOpen && this.renderMainToolbar()}
      </ToolbarContainer>
    ) : null;
  }
}

TableToolbar.propTypes = {
  selected: PropTypes.object,
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
