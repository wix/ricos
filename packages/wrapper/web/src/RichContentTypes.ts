interface RichContentProps {
  locale?: string;
  localeResource?: object;
  placeholder?: string;
  editorKey?: string;
  onChange?(editorState: import('draft-js').EditorState): void;
  initialState?: ContentState;
  theme?: object;
  config?: object;
  plugins?: PluginConfig[];
  ModalsMap?: ModalsMap;
  helpers?: Helpers;
  textToolbarType?: TextToolbarType;
  isMobile?: boolean;
}

interface ExportedRichContentProps extends RichContentProps {
  [propName: string]: any;
}

interface RichContentWrapperProps {
  contentState?: ContentState;
  children?: import('react').ReactElement<ExportedRichContentProps>;
  theme?: string | object;
  locale?: string;
  palette?: Palette;
  plugins?: PluginConfig[];
  isEditor?: boolean;
  isMobile?: boolean;
  rcProps?: RichContentProps;
  textToolbarType?: TextToolbarType;
  textToolbarContainer?: HTMLElement;
  forwardedRef?: import('react').Ref<import('react').ReactElement>;
  placeholder?: string;
}

type TextToolbarType = 'inline' | 'static';

type Helpers = { [propName: string]: (...args: any[]) => any };

type DraftContentState = import('draft-js').RawDraftContentState;

interface ContentState extends DraftContentState {
  VERSION?: string;
}

interface EditorDataInstance {
  getContentState: () => ContentState;
  refresh: (editorState: import('draft-js').EditorState) => void;
}
