/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { Component } from 'react';
import { BGColorIcon, BorderIcon, DuplicateIcon, InsertIcon } from '../icons';
import PropTypes from 'prop-types';
import styles from '../../statics/styles/cell-toolbar.scss';
import { getRange, getColsRange } from '../tableUtils';
import ClickOutside from 'react-click-outside';
import ExternalToolbar from './ExternalToolbar/ExternalToolbar';
import { cloneDeep } from 'lodash';

const getRowIndex = range => range[0].i;
const getColIndex = range => range[0].j;

class CellToolbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMoreMenu: false,
      showInsertMenu: false,
      toolbarProps: null,
    };
  }

  toggleMoreMenu = () => this.setState({ showMoreMenu: !this.state.showMoreMenu });

  closeMoreMenu = () => this.setState({ showMoreMenu: false });

  toggleInsert = () => this.setState({ showInsertMenu: !this.state.showInsertMenu });

  closeInsert = () => this.setState({ showInsertMenu: false });

  getInsertRowOptions = range => [
    <div
      key={'insertAbove'}
      className={styles.option}
      onClick={() => this.props.addRow(getRowIndex(range))}
    >
      Insert 1 above
    </div>,
    <div
      key={'insertBelow'}
      className={styles.option}
      onClick={() => this.props.addRow(getRowIndex(range) + 1)}
    >
      Insert 1 below
    </div>,
  ];

  getInsertColOptions = range => [
    <div
      key={'insertRight'}
      className={styles.option}
      onClick={() => this.props.addCol(getColIndex(range) + 1)}
    >
      Insert 1 right
    </div>,
    <div
      key={'insertLeft'}
      className={styles.option}
      onClick={() => this.props.addCol(getColIndex(range))}
    >
      Insert 1 left
    </div>,
  ];

  getRowOptions = (range, selectedRows) => [
    <div
      key={'deleteRow'}
      className={styles.option}
      onClick={() => this.props.table.deleteRow(getRowIndex(range), selectedRows.length)}
    >
      Delete row
    </div>,
    ...this.getInsertRowOptions(range),
  ];

  getColOptions = (range, selectedCols) => [
    <div
      key={'deleteCol'}
      className={styles.option}
      onClick={() => this.props.table.deleteColumn(getColIndex(range), selectedCols.length)}
    >
      Delete column
    </div>,
    ...this.getInsertColOptions(range),
  ];

  setToolbarProps = toolbarPropsArray => {
    if (toolbarPropsArray && toolbarPropsArray.length > 0) {
      const combinedToolbarProps = cloneDeep({ ...toolbarPropsArray[0] });
      Object.entries(combinedToolbarProps.buttons).forEach(([key, value]) => {
        if (value.type === 'button') {
          value.onClick = args => {
            toolbarPropsArray.forEach(toolbarProp => {
              if (value.isActive() === toolbarProp.buttons[key].isActive()) {
                toolbarProp.buttons[key].onClick(args);
              }
            });
          };
        } else if (value.type === 'GROUP') {
          Object.entries(value.buttonList).forEach(([buttonListKey, buttonListValue]) => {
            buttonListValue.onClick = args => {
              toolbarPropsArray.forEach(toolbarProp => {
                if (
                  buttonListValue.isActive() ===
                  toolbarProp.buttons[key].buttonList[buttonListKey].isActive()
                ) {
                  toolbarProp.buttons[key].buttonList[buttonListKey].onClick(args);
                }
              });
            };
          });
        }
      });
      this.setState({ combinedToolbarProps });
    } else {
      this.setState({ combinedToolbarProps: null });
    }
  };

  bgColorFormatting = () =>
    this.props.table.setCellsStyle({ backgroundColor: 'pink' }, getRange(this.props.selected));
  borderFormatting = () =>
    this.props.table.setCellsSelectionBorderStyle('1px double black', this.props.selected);
  split = () => this.props.table.splitCell(getRange(this.props.selected));
  distributeRows = () =>
    this.props.table.distributeRows(this.props.innerEditorsRefs, getRange(this.props.selected));
  distributeColumns = () => this.props.table.distributeColumns(getColsRange(this.props.selected));
  merge = () => this.props.table.mergeCells(getRange(this.props.selected));
  clear = () => this.props.table.clearRange(getRange(this.props.selected));

  render() {
    const { table, selected, isEditingActive } = this.props;
    const range = selected && getRange(selected);
    const selectedRows = range && table.getSelectedRows(range);
    const selectedCols = range && table.getSelectedCols(range);
    const shouldShowContextMenu = selectedRows || selectedCols || range?.length > 1;
    const shouldShowSplit = range && table.isParentCellSelected(range);
    const additionalOptions = selectedRows
      ? this.getRowOptions(range, selectedRows)
      : selectedCols
      ? this.getColOptions(range, selectedCols)
      : [];
    const insertOptions = selectedRows
      ? this.getInsertRowOptions(range)
      : selectedCols && this.getInsertColOptions(range);
    return selected ? (
      <div
        className={styles.container}
        style={{ visibility: isEditingActive ? 'hidden' : 'visible' }}
      >
        {this.state.combinedToolbarProps && (
          <div className={styles.toolbar}>
            <ExternalToolbar {...this.state.combinedToolbarProps} theme={{}} />
          </div>
        )}
        <div className={styles.toolbar}>
          <BGColorIcon className={styles.icon} onClick={this.bgColorFormatting} />
          <BorderIcon className={styles.icon} onClick={this.borderFormatting} />
          {shouldShowSplit && <DuplicateIcon className={styles.icon} onClick={this.split} />}
          {insertOptions && (
            <ClickOutside
              className={styles.insertButton}
              onClick={this.toggleInsert}
              onClickOutside={this.closeInsert}
            >
              <InsertIcon className={styles.icon} />
              {this.state.showInsertMenu && <div className={styles.moreMenu}>{insertOptions}</div>}
            </ClickOutside>
          )}
        </div>
        {shouldShowContextMenu && (
          <ClickOutside
            className={styles.moreToolbar}
            onClick={this.toggleMoreMenu}
            onClickOutside={this.closeMoreMenu}
          >
            ...
            {this.state.showMoreMenu && (
              <div className={styles.moreMenu}>
                <div className={styles.option} onClick={this.distributeRows}>
                  Distribute rows
                </div>
                <div className={styles.option} onClick={this.distributeColumns}>
                  Distribute columns
                </div>
                <div className={styles.option} onClick={this.merge}>
                  Merge cells
                </div>
                <div className={styles.option} onClick={this.clear}>
                  Clear cells
                </div>
                {additionalOptions}
              </div>
            )}
          </ClickOutside>
        )}
      </div>
    ) : null;
  }
}

CellToolbar.propTypes = {
  selected: PropTypes.object.isRequired,
  table: PropTypes.any,
  innerEditorsRefs: PropTypes.any,
  addCol: PropTypes.func.isRequired,
  addRow: PropTypes.func.isRequired,
  isEditingActive: PropTypes.bool,
};

export default CellToolbar;
