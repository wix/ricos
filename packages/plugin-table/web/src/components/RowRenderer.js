import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class RowRenderer extends PureComponent {
  setRef = ref => this.props.setRowRef && this.props.setRowRef(ref, this.props.row);

  componentDidUpdate(prevProps) {
    const { row, updateRowsRefs, children } = this.props;
    updateRowsRefs &&
      row === 0 &&
      prevProps.children.length !== children.length &&
      updateRowsRefs();
  }

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
  updateRowsRefs: PropTypes.func,
};

export default RowRenderer;
