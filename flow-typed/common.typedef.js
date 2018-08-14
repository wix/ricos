import type { Element } from 'react';

declare module CSSModule {
  declare var exports: { [key: string]: string };
}

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

declare type ClassNameStrategy = (componentData: any, theme: any, styles: any, isMobile: boolean) => string;
