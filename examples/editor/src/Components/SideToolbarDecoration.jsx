import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SideToolbarDecoration extends Component {
  render() {
    const { style, className, children, ...props } = this.props;
    console.log('SideToolbarDecoration rendered');
    return (
      <div style={style} className={className} {...props}>
        {children}
      </div>
    );
  }
}

SideToolbarDecoration.propTypes = {
  children: PropTypes.node,
  style: PropTypes.object,
  className: PropTypes.string,
};

SideToolbarDecoration.displayName = 'SideToolbarDecoration';

export default SideToolbarDecoration;
