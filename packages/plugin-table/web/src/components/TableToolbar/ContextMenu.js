import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from '../../../statics/styles/table-toolbar.scss';
import ClickOutside from 'react-click-outside';
import MultipleCellsContextMenu from './MultipleCellsContextMenu';
import SingleCellContextMenu from './SingleCellContextMenu';

class ContextMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMoreMenu: false,
    };
  }

  toggleMoreMenu = () => this.setState({ showMoreMenu: !this.state.showMoreMenu });

  closeMoreMenu = () => this.setState({ showMoreMenu: false });

  render() {
    const {
      table,
      selected,
      shouldShowContextMenu,
      selectRows,
      selectCols,
      addCol,
      addRow,
      innerEditorsRefs,
      deleteColumn,
      deleteRow,
    } = this.props;
    return (
      <ClickOutside
        className={styles.moreToolbar}
        onClick={this.toggleMoreMenu}
        onClickOutside={this.closeMoreMenu}
      >
        ...
        {this.state.showMoreMenu &&
          (shouldShowContextMenu ? (
            <MultipleCellsContextMenu
              shouldShowContextMenu={shouldShowContextMenu}
              selected={selected}
              table={table}
              innerEditorsRefs={innerEditorsRefs}
              addCol={addCol}
              addRow={addRow}
              deleteColumn={deleteColumn}
              deleteRow={deleteRow}
            />
          ) : (
            <SingleCellContextMenu
              selected={selected}
              table={table}
              selectRows={selectRows}
              selectCols={selectCols}
            />
          ))}
      </ClickOutside>
    );
  }
}

ContextMenu.propTypes = {
  selected: PropTypes.object.isRequired,
  table: PropTypes.any,
  innerEditorsRefs: PropTypes.any,
  addCol: PropTypes.func.isRequired,
  addRow: PropTypes.func.isRequired,
  deleteColumn: PropTypes.func,
  deleteRow: PropTypes.func,
  shouldShowContextMenu: PropTypes.bool,
  selectRows: PropTypes.func,
  selectCols: PropTypes.func,
};

export default ContextMenu;
