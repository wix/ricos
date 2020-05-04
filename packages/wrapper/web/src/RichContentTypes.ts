interface RichContentProps {
  locale?: string;
  localeResource?: object;
  placeholder?: string;
  editorKey?: string;
  onChange?: OnChangeFunction;
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
  children?: RichContentChild;
  contentState?: ContentState;
  isMobile?: boolean;
  locale?: string;
  palette?: Palette;
  plugins?: PluginConfig[];
  rcProps?: RichContentProps;
  theme?: string | object;
}

type RichContentChild = import('react').ReactElement<ExportedRichContentProps>;

interface WixRichContentEditorProps extends RichContentWrapperProps {
  forwardedRef?: import('react').Ref<import('react').ReactElement>;
  placeholder?: string;
  textToolbarContainer?: HTMLElement;
  textToolbarType?: TextToolbarType;
}

type WixRichContentViewerProps = RichContentWrapperProps;

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

type OnChangeFunction = (editorState: import('draft-js').EditorState) => void;
