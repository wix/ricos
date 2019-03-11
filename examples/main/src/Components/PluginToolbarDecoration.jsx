import React, { Component } from 'react';
import PropTypes from 'prop-types';

class PluginToolbarDecoration extends Component {
  render() {
    const { style, className, children, ...props } = this.props;
    console.log('PluginToolbarDecoration rendered');
    return (
      <div style={style} className={className} {...props}>
        {children}
      </div>
    );
  }
}

PluginToolbarDecoration.propTypes = {
  children: PropTypes.node,
  style: PropTypes.object,
  className: PropTypes.string,
};

PluginToolbarDecoration.displayName = 'PluginToolbarDecoration';

export default PluginToolbarDecoration;
