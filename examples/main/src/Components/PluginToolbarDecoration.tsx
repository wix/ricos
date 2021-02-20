import React, { Component, CSSProperties } from 'react';

class PluginToolbarDecoration extends Component<{
  style?: CSSProperties;
  className?: string;
}> {
  static displayName = 'PluginToolbarDecoration';

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

export default PluginToolbarDecoration;
