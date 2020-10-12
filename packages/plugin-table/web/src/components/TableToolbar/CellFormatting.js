/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { Component } from 'react';
import { BGColorIcon, BorderIcon, DuplicateIcon, InsertIcon } from '../../icons';
import PropTypes from 'prop-types';
import styles from '../../../statics/styles/table-toolbar.scss';
import { getRange } from '../../tableUtils';
import ClickOutside from 'react-click-outside';
import { ColorPicker } from 'wix-rich-content-plugin-commons';

const getRowIndex = range => range[0].i;
const getColIndex = range => range[0].j;
const DEFAULT_PALETTE = ['#FFFFFF', '#D5D4D4', '#000000', '#ABCAFF', '#81B0FF', '#0261FF'];

class CellFormatting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showInsertMenu: false,
      showBgColorPicker: false,
      showBorderColorPicker: false,
    };
  }

  toggleInsert = () => this.setState({ showInsertMenu: !this.state.showInsertMenu });
  closeInsert = () => this.setState({ showInsertMenu: false });

  toggleBgColorPicker = e => {
    if (e.target.closest('[data-id=BGColorIcon]')) {
      this.setState({ showBgColorPicker: !this.state.showBgColorPicker });
    }
  };
  closeBgColorPicker = () => this.setState({ showBgColorPicker: false });

  toggleBorderColorPicker = () =>
    this.setState({ showBorderColorPicker: !this.state.showBorderColorPicker });
  closeBorderColorPicker = () => this.setState({ showBorderColorPicker: false });

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

  onColorAdded = () => {
    // eslint-disable-next-line no-console
    console.log('onColorAdded');
  };
  onChange = () => {
    // eslint-disable-next-line no-console
    console.log('onChange');
  };
  onResetColor = () => {
    // eslint-disable-next-line no-console
    console.log('onResetColor');
  };

  renderColorPicker(color, userColors, onColorAdded, onChange) {
    // const { t, isMobile, palette } = this.props;
    const { t, isMobile } = this.props;
    return (
      <div>
        <ColorPicker
          color={color}
          // palette={palette?.slice(0, 7) || DEFAULT_PALETTE}
          palette={DEFAULT_PALETTE}
          userColors={userColors.slice(0, 100)}
          onColorAdded={onColorAdded}
          theme={this.styles}
          isMobile={isMobile}
          onChange={onChange.bind(this)}
          t={t}
          onResetColor={this.onResetColor}
        >
          {({
            renderPalette,
            renderUserColors,
            renderAddColorButton,
            renderResetColorButton,
            mergedStyles,
          }) => (
            <div className={mergedStyles.colorPicker_palette}>
              <div className={mergedStyles.colorPicker_buttons_container}>
                {renderPalette()}
                {renderUserColors()}
              </div>
              <hr className={mergedStyles.colorPicker_separator} />
              <div className={mergedStyles.colorPicker_buttons_container}>
                {renderResetColorButton()}
                {renderAddColorButton()}
              </div>
            </div>
          )}
        </ColorPicker>
      </div>
    );
  }

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
        <ClickOutside
          className={styles.insertButton}
          onClick={this.toggleBgColorPicker}
          onClickOutside={this.closeBgColorPicker}
        >
          {/* <BGColorIcon className={styles.icon} onClick={this.bgColorFormatting} /> */}
          <BGColorIcon data-id={'BGColorIcon'} className={styles.icon} />
          {this.state.showBgColorPicker && (
            <div className={styles.moreMenu}>
              {this.renderColorPicker('#FFFFFF', DEFAULT_PALETTE, this.onColorAdded, this.onChange)}
            </div>
          )}
        </ClickOutside>
        <ClickOutside
          className={styles.insertButton}
          onClick={this.toggleBorderColorPicker}
          onClickOutside={this.closeBorderColorPicker}
        >
          {/* <BorderIcon className={styles.icon} onClick={this.borderFormatting} /> */}
          <BorderIcon className={styles.icon} />
          {this.state.showBorderColorPicker && (
            <div className={styles.moreMenu}>{'colorPicker'}</div>
          )}
        </ClickOutside>
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
  t: PropTypes.func,
  isMobile: PropTypes.bool,
};

export default CellFormatting;
