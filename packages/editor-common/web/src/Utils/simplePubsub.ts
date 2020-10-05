import { merge } from 'lodash';

type Callback = (...args: unknown[]) => unknown;

export const simplePubsub = (initialState?: Record<string, unknown>) => {
  let state: { focusedBlock?: string; [key: string]: unknown } = initialState || {};
  const listeners: Record<string, Callback[]> = {};

  const subscribe = (key: string, callback: (...args: unknown[]) => unknown) => {
    if (typeof callback !== 'function') {
      throw 'Callback for key ' + key + ' is not a function';
    }
    listeners[key] = listeners[key] || [];
    listeners[key].push(callback);
    return () => {
      listeners[key] = listeners[key].filter(listener => listener !== callback);
    };
  };

  const unsubscribe = (key: string, callback: Callback): void => {
    listeners[key] = listeners[key].filter(listener => listener !== callback);
  };

  // If unsubscribe is called on componentWillUnmount, the state.focusedBlock key is null
  // so, the return value is used for unsubscribe
  const subscribeOnBlock = ({
    key,
    blockKey = state.focusedBlock,
    callback,
  }: {
    key: string;
    blockKey: string;
    callback: Callback;
  }) => {
    return subscribe(blockHandlerKey(key, blockKey), callback);
  };

  // Deep merge objects into store. Merges the the newData with the data for the given key.
  const update = (key: string, newData: unknown, blockKey: string): void => {
    const data = get(key);
    const newItem = merge({}, data, newData);
    blockKey ? _setSingle(key, newItem, blockKey) : set(key, newItem);
  };

  const _setSingle = (key: string, item: unknown, blockKey?: string) => {
    state = {
      ...state,
      [key]: item,
    };
    if (listeners[key]) {
      listeners[key].forEach(listener => listener(state[key], blockKey));
    }
  };

  const _setBatch = (updates: Record<string, unknown>) => {
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

  const set = (...args: Parameters<typeof _setBatch | typeof _setSingle>) => {
    if (args.length === 1) {
      _setBatch(args[0]);
    } else {
      _setSingle(...args);
    }
  };

  const setBlockHandler = (key: string, blockKey: string, item: unknown): void => {
    _setSingle(blockHandlerKey(key, blockKey), item);
  };

  const setBlockData = ({ key, blockKey = state.focusedBlock, item }) => {
    _setSingle(blockHandlerKey(key, blockKey), item);
  };

  const get = (key: string): unknown => state[key];

  const getBlockHandler = (key: string, blockKey: string = state.focusedBlock) => {
    return state[blockHandlerKey(key, blockKey)];
  };

  const getBlockData = ({ key, blockKey = state.focusedBlock }) => {
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

export type Pubsub = ReturnType<typeof simplePubsub>;
export type Store = Pubsub['store'];
