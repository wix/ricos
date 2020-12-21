import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class RowRenderer extends PureComponent {
  setRef = ref => this.props.setRowRef?.(ref, this.props.row);

  render() {
    const { row, children, getRowHeight } = this.props;
    const height = getRowHeight(row);
    return (
      <tr data-row={row} style={{ height }} ref={this.setRef}>
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
};

export default RowRenderer;
