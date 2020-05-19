import React, { Component } from 'react';
import { addListener, removeListener, EVENTS } from './emitter';

export default WrappedComponent => {
  class PluginButtonProvider extends Component {
    constructor(props) {
      super(props);
      this.state = {};
    }

    componentDidMount() {
      addListener(EVENTS.PLUGIN_BUTTONS_READY, this.onPluginButtonsReady);
    }

    componentWillUnmount() {
      removeListener(EVENTS.PLUGIN_BUTTONS_READY, this.onPluginButtonsReady);
    }

    onPluginButtonsReady = pluginButtonProps => {
      const buttonsCollection = pluginButtonProps.reduce(
        (collection, button) => ({ ...collection, [button.name]: button }),
        {}
      );
      this.setState({ buttonsCollection });
    };

    render() {
      return <WrappedComponent buttons={this.state.buttonsCollection || {}} {...this.props} />;
    }
  }
  return PluginButtonProvider;
};
