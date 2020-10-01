/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { Component } from 'react';
import { BGColorIcon, BorderIcon, DuplicateIcon, InsertIcon } from '../../icons';
import PropTypes from 'prop-types';
import styles from '../../../statics/styles/table-toolbar.scss';
import { getRange } from '../../tableUtils';
import ClickOutside from 'react-click-outside';

const getRowIndex = range => range[0].i;
const getColIndex = range => range[0].j;

class CellFormatting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showInsertMenu: false,
    };
  }

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

  bgColorFormatting = () =>
    this.props.table.setCellsStyle({ backgroundColor: 'pink' }, getRange(this.props.selected));
  borderFormatting = () =>
    this.props.table.setCellsSelectionBorderStyle('1px double black', this.props.selected);
  split = () => this.props.table.splitCell(getRange(this.props.selected));

  render() {
    const { table, selected } = this.props;
    const range = selected && getRange(selected);
    const selectedRows = range && table.getSelectedRows(range);
    const selectedCols = range && table.getSelectedCols(range);
    const shouldShowSplit = range && table.isParentCellSelected(range);
    const insertOptions = selectedRows
      ? this.getInsertRowOptions(range)
      : selectedCols && this.getInsertColOptions(range);
    return (
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
    );
  }
}

CellFormatting.propTypes = {
  selected: PropTypes.object.isRequired,
  table: PropTypes.any,
  addCol: PropTypes.func.isRequired,
  addRow: PropTypes.func.isRequired,
};

export default CellFormatting;
