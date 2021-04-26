import React, { Component, CSSProperties } from 'react';

class SideToolbarDecoration extends Component<{
  style?: CSSProperties;
  className?: string;
}> {
  static displayName = 'SideToolbarDecoration';

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

export default SideToolbarDecoration;
