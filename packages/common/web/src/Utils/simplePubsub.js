import { merge } from 'lodash';

export const simplePubsub = initialState => {
  let state = initialState || {};
  const listeners = {};

  const subscribe = (key, callback) => {
    if (typeof callback !== 'function') {
      throw 'Callback for key ' + key + ' is not a function';
    }
    listeners[key] = listeners[key] || [];
    listeners[key].push(callback);
    return () => {
      listeners[key] = listeners[key].filter(listener => listener !== callback);
    };
  };

  const unsubscribe = (key, callback) => {
    listeners[key] = listeners[key].filter(listener => listener !== callback);
  };

  // If unsubscribe is called on componentWillUnmount, the state.visibleBlock key is null
  // so, the return value is used for unsubscribe
  const subscribeOnBlock = ({ key, blockKey = state.visibleBlock, callback }) => {
    return subscribe(blockHandlerKey(key, blockKey), callback);
  };

  //use to merge objects into store. Merges the the newData with the data for the given key.
  const update = (key, newData, blockKey) => {
    const data = get(key);
    const newItem = merge({}, data, newData);
    blockKey ? _setSingle(key, newItem, blockKey) : set(key, newItem);
  };

  const _setSingle = (key, item, blockKey) => {
    state = {
      ...state,
      [key]: item,
    };
    if (listeners[key]) {
      listeners[key].forEach(listener => listener(state[key], blockKey));
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

  const set = (...args) => {
    if (args.length === 1) {
      _setBatch(args[0]);
    } else if (args.length === 2) {
      _setSingle(args[0], args[1]);
    } else {
      console.error('pubsub set invalid args'); // eslint-disable-line no-console
    }
  };

  const setBlockHandler = (key, blockKey, item) => {
    _setSingle(blockHandlerKey(key, blockKey), item);
  };

  const setBlockData = ({ key, blockKey = state.visibleBlock, item }) => {
    _setSingle(blockHandlerKey(key, blockKey), item);
  };

  const get = key => state[key];

  const getBlockHandler = (key, blockKey = state.visibleBlock) => {
    return state[blockHandlerKey(key, blockKey)];
  };

  const getBlockData = ({ key, blockKey = state.visibleBlock }) => {
    return state[blockHandlerKey(key, blockKey)];
  };

  const blockHandlerKey = (key, blockKey) => `${blockKey}_${key}`;

  const store = {
    get,
    getBlockHandler,
    update,
    set,
    setBlockHandler,
  };

  return {
    subscribe,
    unsubscribe,
    update,
    set,
    setBlockHandler,
    get,
    getBlockHandler,
    store,
    getBlockData,
    setBlockData,
    subscribeOnBlock,
  };
};
