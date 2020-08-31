import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { getRowHeight } from '../tableUtils';

class RowRenderer extends PureComponent {
  render() {
    const { row, children, componentData } = this.props;
    const height = getRowHeight(componentData, row);
    return (
      <tr data-row={row} style={{ height }}>
        {children}
      </tr>
    );
  }
}

RowRenderer.propTypes = {
  row: PropTypes.number.isRequired,
  children: PropTypes.any.isRequired,
  componentData: PropTypes.object,
};

export default RowRenderer;
