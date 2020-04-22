/*::
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

declare type BUTTONS = {
  FILES: 'file',
  TOGGLE: 'toggle',
  PANEL: 'panel',
  INLINE_PANEL: 'inline-panel',
  EXTERNAL_MODAL: 'external-modal',
  DROPDOWN: 'dropdown',
  SEPARATOR: 'separator',
  SIZE_ORIGINAL: 'size-original',
  SIZE_SMALL_CENTER: 'size-small-center',
  SIZE_SMALL_LEFT: 'size-small-left',
  SIZE_SMALL_RIGHT: 'size-small-right',
  SIZE_CONTENT: 'size-content',
  SIZE_FULL_WIDTH: 'size-full-width',
  SIZE_SMALL: 'size-small',
  SIZE_MEDIUM: 'size-medium',
  SIZE_LARGE: 'size-large',
  ALIGNMENT_LEFT: 'alignment-left',
  ALIGNMENT_CENTER: 'alignment-center',
  ALIGNMENT_RIGHT: 'alignment-right',
  WIDTH: 'width',
  HEIGHT: 'height',
  LINK: 'link',
  DELETE: 'delete',
  CUSTOM: 'custom'
};

declare type DISPLAY_MODE = {
  NORMAL: 'NORMAL',
  FLOATING: 'FLOATING',
};

declare type Store = {|
  update: (key: string, newData: any) => void,
  set: (param: any, param2?: any) => void,
  get: (key: string) => any,
|};

declare type Pubsub = {|
  getBlockHandler: (key: string) => any,
  subscribe: (key: string, callback: Function) => void,
  unsubscribe: (key: string, callback: Function) => void,
  update: (key: string, newData: any) => void,
  set: (param: any, param2?: any) => void,
  get: (key: string) => any,
  store: Store
|};
*/
