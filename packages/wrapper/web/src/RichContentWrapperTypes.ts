import { RawDraftContentState, EditorState } from 'draft-js';
export type FinalTheme = { theme: { modalTheme: { content: any }; [propName: string]: any } };
export type ForwardedRef = any;
export interface RichContentProps {
  locale?: string;
  localeResource?: object;
  placeholder?: string;
  editorKey?: string;
  onChange?(editorState: EditorState): void;
  initialState?: RawDraftContentState;
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
  getContentState: () => RawDraftContentState;
  refresh: (editorState: EditorState) => void;
}
