type InitialState = {
  blocks: object[];
  entityMap: { [index: number]: object };
};
type Theme = {
  modalTheme: { content: any };
  [propName: string]: any;
};
type TextToolbarType = 'inline' | 'static';
type Helpers = { [propName: string]: (...args: any[]) => any };
