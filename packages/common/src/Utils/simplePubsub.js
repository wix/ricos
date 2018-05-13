import merge from 'lodash/merge';

export const simplePubsub = initialState => {
  let state = initialState || {};
  const listeners = {};

  const subscribe = (key, callback) => {
    if (typeof callback !== 'function') {
      throw 'Callback for key ' + key + ' is not a function';
    }
    listeners[key] = listeners[key] || [];
    listeners[key].push(callback);
  };

  const unsubscribe = (key, callback) => {
    listeners[key] = listeners[key].filter(listener => listener !== callback);
  };

  const update = (key, newData) => {
    const data = get(key);
    const newItem = merge({}, data, newData);
    set(key, newItem);
  };

  const set = (...args) => {
    const _setSingle = (key, item) => {
      state = {
        ...state,
        [key]: item,
      };
      if (listeners[key]) {
        listeners[key].forEach(listener => listener(state[key]));
      }
    };

    const _setBatch = updates => {
      state = {
        ...state,
        ...updates,
      };
      Object.keys(updates).forEach(key => {
        if (listeners[key]) {
          listeners[key].forEach(listener => listener(state[key]));
        }
      });
    };

    if (args.length === 1) {
      _setBatch(args[0]);
    } else if (args.length === 2) {
      _setSingle(args[0], args[1]);
    } else {
      console.error('pubsub set invalid args'); // eslint-disable-line no-console
    }
  };

  const get = key => state[key];

  const store = {
    get,
    update,
    set,
  };

  return {
    subscribe,
    unsubscribe,
    update,
    set,
    get,
    store,
  };
};
