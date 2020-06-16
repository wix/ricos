// api docs at https://nodejs.org/api/events.html

import EventEmitter from 'eventemitter3';
/* eslint-disable no-console */
const eventEmitter = new EventEmitter();
console.debug(`eventEmitter: created ${Date.now()}`);

// will retry emitting up to 'retries' times if not enough listeners subscribed
export function emit(event, data, listenerCount = 1, retries = 3, delay = 10) {
  const retry = this?.retry || 1;
  if (eventEmitter.listenerCount(event) < listenerCount && retry <= retries) {
    console.debug(
      `event emitter: there are no enough listeners for event ${event}. Retry ${retry ||
        1} out of ${retries}`
    );
    setTimeout(emit.bind({ retry: retry + 1 }, event, data, listenerCount, retries, delay), delay);
  } else {
    eventEmitter.emit(event, data);
    console.debug(
      `event emitter: ${event} emitted for ${eventEmitter.listenerCount(event)} listeners`
    );
  }
}

export const listenerCount = event => eventEmitter.listenerCount(event);

export const addListenerOnce = (event, listener) => {
  console.debug(`eventEmitter: adding one-time listener for ${event}`);
  eventEmitter.once(event, listener);
};

export const addListener = (event, listener) => {
  eventEmitter.on(event, listener);
  console.debug(
    `eventEmitter: adding listener for ${event}. Total: ${eventEmitter.listenerCount(event)}`
  );
};

export const removeListener = (event, listener) => {
  console.debug(`eventEmitter: removing listener for ${event}`);
  eventEmitter.removeListener(event, listener);
};

export const removeAllListeners = event => {
  console.debug(`eventEmitter: removing all listeners for ${event}`);
  eventEmitter.removeAllListeners(event);
};
