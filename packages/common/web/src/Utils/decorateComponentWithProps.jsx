import React, { Component } from 'react';
import getDisplayName from './getDisplayName';

/* eslint-disable keyword-spacing */
export default (EmbeddedComponent, props) =>
  class extends Component {
    static displayName = `Decorated(${getDisplayName(EmbeddedComponent)})`;
    render() {
      return <EmbeddedComponent {...this.props} {...props} />;
    }
  };
