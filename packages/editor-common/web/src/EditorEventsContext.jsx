/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { remove } from 'lodash';

export const EditorEvents = {
  PUBLISH: 'rce:publish',
};

export const EditorEventsContext = React.createContext({
  subscribe() {},
  unsubscribe() {},
  dispatch() {},
});

export const WithEditorEventsProps = {
  editorEvents: PropTypes.shape({
    subscribe: PropTypes.func,
    unsubscribe: PropTypes.func,
    dispatch: PropTypes.func,
  }),
};

export const withEditorEvents = WrappedComponent => props => (
  <EditorEventsContext.Consumer>
    {contextValue => (
      <WrappedComponent editorEvents={contextValue} ref={props?.forwardedRef} {...props} />
    )}
  </EditorEventsContext.Consumer>
);

export class EditorEventsProvider extends React.Component {
  static propTypes = {
    children: PropTypes.node,
  };

  state = {
    subscribe: this.subscribe.bind(this),
    unsubscribe: this.unsubscribe.bind(this),
    dispatch: this.dispatch.bind(this),
  };

  events = {};

  dispatch(event, data) {
    const callbacks = this.events[event] || [];
    console.log('dispatch callbacks', callbacks);

    return Promise.all(callbacks.map(cb => cb(data)));
  }

  subscribe(event, cb) {
    console.log('subscribe', event, cb);
    this.events[event] = this.events[event] || [];
    this.events[event].push(cb);

    return () => this.unsubscribe(event, cb);
  }

  unsubscribe(event, cb) {
    remove(this.events[event], callback => callback === cb);
  }

  render() {
    const { children } = this.props;

    return (
      <EditorEventsContext.Provider value={this.state}>{children}</EditorEventsContext.Provider>
    );
  }
}
