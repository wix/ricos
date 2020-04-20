export type InitialState = { blocks: object[]; entityMap: { [index: number]: object } };
export type FinalTheme = { theme: { modalTheme: { content: any }; [propName: string]: any } };
export type EditorState = import('draft-js').EditorState;
export type ForwardedRef = any;
export interface RichContentProps {
  locale?: string;
  localeResource?: object;
  placeholder?: string;
  editorKey?: string;
  onChange?(editorState: EditorState): void;
  initialState?: InitialState;
  theme?: object;
  config?: object;
  plugins?: PluginConfig[];
  ModalsMap?: ModalsMap;
  helpers?: { [propName: string]: (...args: any[]) => any };
}

export interface RichContentWrapperProps {
  children: import('react').ReactElement;
  theme?: string | object;
  locale?: string;
  palette?: Palette;
  plugins?: PluginConfig[];
  isEditor?: boolean;
  isMobile?: boolean;
  rcProps?: RichContentProps;
  forwardedRef?: ForwardedRef;
}

export interface EditorDataInstance {
  getContentState: () => InitialState;
  refresh: (editorState: EditorState) => void;
}
