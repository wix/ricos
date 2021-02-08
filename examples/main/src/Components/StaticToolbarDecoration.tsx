import React, { Component, CSSProperties } from 'react';

class StaticToolbarDecoration extends Component<{
  style?: CSSProperties;
  className?: string;
}> {
  static displayName = 'StaticToolbarDecoration';

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

export default StaticToolbarDecoration;
