/* eslint-disable @typescript-eslint/no-explicit-any */
import { merge } from 'lodash';

type Callback = (...args: any[]) => any;

export const simplePubsub = (initialState?: Record<string, any>) => {
  let state: { focusedBlock?: string; [key: string]: any } = initialState || {};
  const listeners: Record<string, Callback[]> = {};

  const subscribe = (key: string, callback: (...args: any[]) => any) => {
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
    blockKey: string | undefined;
    callback: Callback;
  }) => {
    return subscribe(blockHandlerKey(key, blockKey), callback);
  };

  // Deep merge objects into store. Merges the the newData with the data for the given key.
  const update = (key: string, newData: any, blockKey?: string): void => {
    const data = get(key);
    const newItem = merge({}, data, newData);
    blockKey ? _setSingle(key, newItem, blockKey) : set(key, newItem);
  };

  const _setSingle = (key: string, item: any, blockKey?: string) => {
    state = {
      ...state,
      [key]: item,
    };
    if (listeners[key]) {
      listeners[key].forEach(listener => listener(state[key], blockKey));
    }
  };

  const _setBatch = (updates: Record<string, any>) => {
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

  const setBlockHandler = (key: string, blockKey: string, item: any): void => {
    _setSingle(blockHandlerKey(key, blockKey), item);
  };

  const setBlockData = ({
    key,
    blockKey = state.focusedBlock,
    item,
  }: {
    key: string;
    blockKey?: string;
    item: any;
  }) => {
    _setSingle(blockHandlerKey(key, blockKey), item);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const get = (key: string): any => state[key];

  const getBlockHandler = (key: string, blockKey: string | undefined = state.focusedBlock) => {
    return state[blockHandlerKey(key, blockKey)];
  };

  const getBlockData = ({
    key,
    blockKey = state.focusedBlock,
  }: {
    key: string;
    blockKey?: string;
  }) => {
    return state[blockHandlerKey(key, blockKey)];
  };

  const blockHandlerKey = (key: string, blockKey?: string) => `${blockKey}_${key}`;

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
