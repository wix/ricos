import React, { Component } from 'react';
import { TOOLBARS } from 'wix-rich-content-editor-common';
import { EVENTS } from './consts';

export const withToolbarButtons = (WrappedComponent, toolbarName = TOOLBARS.EXTERNAL) => {
  class PluginButtonProvider extends Component {
    constructor(props) {
      super(props);
      this.state = {};
    }

    componentDidMount() {
      import(/* webpackChunkName: "rce-event-emitter" */ `./emitter`).then(({ addListener }) =>
        addListener(EVENTS.TOOLBAR_BUTTONS_READY, this.onButtonPropsReady)
      );
    }

    componentWillUnmount() {
      import(/* webpackChunkName: "rce-event-emitter" */ `./emitter`).then(({ removeListener }) =>
        removeListener(EVENTS.TOOLBAR_BUTTONS_READY, this.onButtonPropsReady)
      );
    }

    onButtonPropsReady = buttonProps => this.setState({ buttonProps: buttonProps[toolbarName] });

    render() {
      return <WrappedComponent buttons={this.state.buttonProps || {}} {...this.props} />;
    }
  }
  return PluginButtonProvider;
};
