import React, { Component } from 'react';
import PropTypes from 'prop-types';

class StaticToolbarDecoration extends Component {
  render() {
    const { style, className, children, ...props } = this.props;
    console.log('StaticToolbarDecoration rendered');
    return (
      <div style={style} className={className} {...props}>
        {children}
      </div>
    );
  }
}

StaticToolbarDecoration.propTypes = {
  children: PropTypes.node,
  style: PropTypes.object,
  className: PropTypes.string,
};

StaticToolbarDecoration.displayName = 'StaticToolbarDecoration';

export default StaticToolbarDecoration;
