import React, { Component } from 'react';

export default WrappedComponent => {
  class PluginButtonProvider extends Component {
    constructor(props) {
      super(props);
      this.state = {};
    }

    componentDidMount() {
      import(
        /* webpackChunkName: "rce-event-emitter" */ `./emitter`
      ).then(({ addListener, EVENTS }) =>
        addListener(EVENTS.PLUGIN_BUTTONS_READY, this.onPluginButtonsReady)
      );
    }

    componentWillUnmount() {
      import(
        /* webpackChunkName: "rce-event-emitter" */ `./emitter`
      ).then(({ removeListener, EVENTS }) =>
        removeListener(EVENTS.PLUGIN_BUTTONS_READY, this.onPluginButtonsReady)
      );
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
