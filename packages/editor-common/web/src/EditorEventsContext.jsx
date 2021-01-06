import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { remove } from 'lodash';

export const EditorEvents = {
  PUBLISH: 'rce:publish',
};

export const EditorEventsContext = React.createContext({
  subscribe() {},
  unsubscribe() {},
  dispatch() {},
  publish() {},
});

export const WithEditorEventsProps = {
  editorEvents: PropTypes.shape({
    subscribe: PropTypes.func,
    unsubscribe: PropTypes.func,
    dispatch: PropTypes.func,
    publish: PropTypes.func,
  }),
};

export const withEditorEvents = WrappedComponent => props => (
  <EditorEventsContext.Consumer>
    {contextValue => <WrappedComponent editorEvents={contextValue} {...props} />}
  </EditorEventsContext.Consumer>
);

export const withEditorEventsRef = WrappedComponent => {
  class WithEditorEvents extends React.Component {
    static propTypes = {
      forwardRef: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.shape({ current: PropTypes.func }),
      ]),
    };
    render() {
      const { forwardRef, ...props } = this.props;
      return (
        <EditorEventsContext.Consumer>
          {contextValue => (
            <WrappedComponent editorEvents={contextValue} {...props} ref={forwardRef} />
          )}
        </EditorEventsContext.Consumer>
      );
    }
  }
  return forwardRef((props, ref) => <WithEditorEvents {...props} forwardRef={ref} />);
};

export class EditorEventsProvider extends React.Component {
  static propTypes = {
    children: PropTypes.node,
  };

  state = {
    subscribe: this.subscribe.bind(this),
    unsubscribe: this.unsubscribe.bind(this),
    dispatch: this.dispatch.bind(this),
    publish: this.publish.bind(this),
  };

  events = {};

  dispatch(event, data) {
    const callbacks = this.events[event] || [];
    return Promise.all(callbacks.map(cb => cb(data)));
  }

  publish() {
    return this.dispatch(EditorEvents.PUBLISH).then(publishResponse => {
      const editorResponse = publishResponse.filter(
        ({ type } = {}) => type === 'EDITOR_PUBLISH'
      )[0];
      return editorResponse?.data;
    });
  }

  subscribe(event, cb) {
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
