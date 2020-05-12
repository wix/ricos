import React, { Component } from 'react';
import { addListenerOnce, EVENTS } from './emitter';

export default WrappedComponent => {
  class PluginButtonProvider extends Component {
    constructor(props) {
      super(props);
      this.state = {};
    }

    componentDidMount() {
      addListenerOnce(EVENTS.PLUGIN_BUTTONS_READY, pluginButtonProps =>
        this.setState({ pluginButtonProps })
      );
    }

    render() {
      return <WrappedComponent buttons={this.state.pluginButtonProps || []} {...this.props} />;
    }
  }
  return PluginButtonProvider;
};
