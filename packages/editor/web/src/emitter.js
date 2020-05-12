import EventEmitter from 'eventemitter3';
/* eslint-disable no-console */
const eventEmitter = new EventEmitter();
console.debug('eventEmitter: created');

export const emit = (event, data) => {
  console.debug(`eventEmitter: ${event} emitted with ${data}`);
  return eventEmitter.emit(event, data);
};

export const addListenerOnce = (event, listener) => {
  console.debug(`eventEmitter: adding one-time listener for ${event}`);
  eventEmitter.once(event, listener);
};

export const addListener = (event, listener) => {
  console.debug(`eventEmitter: adding listener for ${event}`);
  eventEmitter.on(event, listener);
};

export const EVENTS = Object.freeze({
  PLUGIN_BUTTONS_READY: 'PLUGIN_BUTTONS_READY',
});
