import React, { Component, ComponentType } from 'react';
import { getDisplayName, PluginConfig } from 'wix-rich-content-common';

export default (
  EmbeddedComponent: ComponentType,
  props: { component?: ComponentType; settings?: PluginConfig }
) =>
  class extends Component {
    static displayName = `Decorated(${getDisplayName(EmbeddedComponent)})`;
    render() {
      return <EmbeddedComponent {...this.props} {...props} />;
    }
  };
