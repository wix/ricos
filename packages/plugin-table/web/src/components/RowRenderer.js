import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class RowRenderer extends PureComponent {
  setRef = ref => this.props.setRowRef?.(ref, this.props.row);

  render() {
    const { row, children, getRowHeight, rows } = this.props;
    const height = getRowHeight(row);
    return (
      <tr data-row={row} style={{ height }} ref={this.setRef}>
        {rows && React.cloneElement(rows, { index: row })}
        {children}
      </tr>
    );
  }
}

RowRenderer.propTypes = {
  row: PropTypes.number.isRequired,
  children: PropTypes.any.isRequired,
  getRowHeight: PropTypes.func,
  setRowRef: PropTypes.func,
  rows: PropTypes.any,
};

export default RowRenderer;
