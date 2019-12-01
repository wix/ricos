import React, { Component } from 'react';
import { getDisplayName } from 'wix-rich-content-common';

/* eslint-disable keyword-spacing */
export default (EmbeddedComponent, props) =>
  class extends Component {
    static displayName = `Decorated(${getDisplayName(EmbeddedComponent)})`;
    render() {
      return <EmbeddedComponent {...this.props} {...props} />;
    }
  };
