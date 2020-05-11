import React, { Component } from 'react';
import { addListener, EVENTS } from './emitter';

export default Component => {
  class PluginButtonProvider extends Component {
    constructor(props) {
      super(props);
      this.state = {};
      addListener(EVENTS.PLUGIN_BUTTONS_READY, pluginButtonProps => {
        // console.log('on plugin props ready:', pluginButtonProps);
        this.setState({ pluginButtonProps });
      });
    }

    render() {
      if (!this.state.pluginButtonProps) {
        return null;
      }

      return <Component buttons={this.state.pluginButtonProps} />;
    }
  }
  return PluginButtonProvider;
};
