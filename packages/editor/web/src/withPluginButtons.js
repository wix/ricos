import React, { Component } from 'react';
import { EVENTS } from './consts';

const withButtonProps = (WrappedComponent, event) => {
  class PluginButtonProvider extends Component {
    constructor(props) {
      super(props);
      this.state = {};
    }

    componentDidMount() {
      import(/* webpackChunkName: "rce-event-emitter" */ `./emitter`).then(({ addListener }) =>
        addListener(event, this.onButtonPropsReady)
      );
    }

    componentWillUnmount() {
      import(/* webpackChunkName: "rce-event-emitter" */ `./emitter`).then(({ removeListener }) =>
        removeListener(event, this.onButtonPropsReady)
      );
    }

    onButtonPropsReady = buttonProps => this.setState({ buttonProps });

    render() {
      return <WrappedComponent buttons={this.state.buttonProps || {}} {...this.props} />;
    }
  }
  return PluginButtonProvider;
};

const withPluginButtons = WrappedComponent =>
  withButtonProps(WrappedComponent, EVENTS.PLUGIN_BUTTONS_READY);
const withTextButtons = WrappedComponent =>
  withButtonProps(WrappedComponent, EVENTS.TEXT_BUTTONS_READY);
const withInlinePluginButtons = WrappedComponent =>
  withButtonProps(WrappedComponent, EVENTS.INLINE_PLUGIN_BUTTONS_READY);

export { withTextButtons, withPluginButtons, withInlinePluginButtons };
