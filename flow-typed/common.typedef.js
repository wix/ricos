import type { Element } from 'react';

declare type Helpers = {
  openModal?: (props: any) => void,
  closeModal?: Function,
  onFilesChange?: (files: Array<any>, updateEntity: ({ data: any, error?: any })) => void,
  handleFileSelection?: (index?: ?number, multiple: boolean,
    updateEntity: ({ data: any, error?: any }) => void, removeEntity?: Function) => void,
  onVideoSelected?: (url: string, updateEntity: ({ data: any, error?: any }) => void) => void
};

declare type Translate = (key: string) => string;

declare type Component = (props: any) => Element;

declare type TOOLBARS = {
  SIDE: 'SIDE',
  MOBILE: 'MOBILE',
  FOOTER: 'FOOTER',
  STATIC: 'TEXT',
  INLINE: 'INLINE'
};

declare type Store = {|
  update: (key: string, newData: any) => void,
  set: (param: any, param2?: any) => void,
  get: (key: string) => any,
|};

declare type Pubsub = (initialState: any) => {|
  subscribe: (key: string, callback: Function) => void,
  unsubscribe: (key: string, callback: Function) => void,
  update: (key: string, newData: any) => void,
  set: (param: any, param2?: any) => void,
  get: (key: string) => any,
  store: Store
|};
