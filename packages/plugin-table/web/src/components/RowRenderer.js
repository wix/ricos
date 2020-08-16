import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class RowRenderer extends PureComponent {
  render() {
    const { row, children } = this.props;
    return <tr data-row={row}>{children}</tr>;
  }
}

RowRenderer.propTypes = {
  row: PropTypes.number.isRequired,
  children: PropTypes.any.isRequired,
};

export default RowRenderer;
