import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import tableResizer from '../table-resize';

export default class Cell extends PureComponent {
  setResize = ref => {
    const { onResizeCol } = this.props;
    if (onResizeCol && ref && !this.state?.tableRef) {
      tableResizer(ref, onResizeCol);
      this.setState({ tableRef: ref });
    }
  };
  render() {
    const { className } = this.props;
    return (
      <table className={className} ref={this.setResize}>
        {this.props.children}
      </table>
    );
  }
}

Cell.propTypes = {
  onResizeCol: PropTypes.func,
  className: PropTypes.string,
  children: PropTypes.any,
};
