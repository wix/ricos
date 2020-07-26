/* eslint-disable @typescript-eslint/no-explicit-any */

export type Store = {
  update: (key: string, newData: any) => void;
  set: (param: any, param2?: any) => void;
  get: (key: string) => any;
};

export type Pubsub = {
  getBlockHandler: (key: string) => any;
  subscribe: (key: string, callback: (...args: any[]) => any) => void;
  unsubscribe: (key: string, callback: (...args: any[]) => any) => void;
  update: (key: string, newData: any) => void;
  set: (param: any, param2?: any) => void;
  get: (key: string) => any;
  store: Store;
};
