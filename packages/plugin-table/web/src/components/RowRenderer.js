import React, { Component } from 'react';
import PropTypes from 'prop-types';

class RowRenderer extends Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.rowsToUpdate?.includes(nextProps.row) || false;
  }

  setRef = ref => this.props.setRowRef?.(ref, this.props.row);

  render() {
    const { row, children, getRowHeight } = this.props;
    const height = getRowHeight(row);
    return (
      <tr style={{ height }} ref={this.setRef}>
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
  rowsToUpdate: PropTypes.array,
};

export default RowRenderer;
