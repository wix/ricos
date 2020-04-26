type Theme = {
  modalTheme: { content: any };
  [propName: string]: any;
};
type TextToolbarType = 'inline' | 'static';
type Helpers = { [propName: string]: (...args: any[]) => any };

declare module 'wix-rich-content-editor';
declare module 'wix-rich-content-viewer';
