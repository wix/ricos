import { EditorState } from 'draft-js';
export interface RichContentProps {
  locale?: string;
  localeResource?: object;
  placeholder?: string;
  editorKey?: string;
  onChange?(editorState: EditorState): void;
  initialState?: ContentState;
  theme?: object;
  config?: object;
  plugins?: PluginConfig[];
  ModalsMap?: ModalsMap;
  helpers?: Helpers;
  textToolbarType?: TextToolbarType;
  isMobile?: boolean;
}

export interface ExportedRichContentProps extends RichContentProps {
  [propName: string]: any;
}

export interface EditorDataInstance {
  getContentState: () => ContentState;
  refresh: (editorState: EditorState) => void;
}
