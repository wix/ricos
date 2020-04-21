import { EditorState, RawDraftContentState } from 'draft-js';
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
  helpers?: Helpers;
  [propName: string]: any;
}

export interface EditorDataInstance {
  getContentState: () => RawDraftContentState;
  refresh: (editorState: EditorState) => void;
}

export type ForwardedRef = any;
