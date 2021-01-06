import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class RowRenderer extends PureComponent {
  setRef = ref => this.props.setRowRef?.(ref, this.props.row);

  render() {
    const { row, children, height } = this.props;
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
  height: PropTypes.number,
  setRowRef: PropTypes.func,
};

export default RowRenderer;
