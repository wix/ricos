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

interface RicosProps {
  _rcProps?: RichContentProps;
  children?: RichContentChild;
  contentState?: ContentState;
  isMobile?: boolean;
  locale?: string;
  palette?: Palette;
  plugins?: PluginConfig[];
  theme?: string | object;
}

interface RicosEditorProps extends RicosProps {
  placeholder?: string;
  textToolbarContainer?: HTMLElement;
  textToolbarType?: TextToolbarType;
}

type RicosViewerProps = RicosProps;

type RichContentChild = import('react').ReactElement<ExportedRichContentProps>;

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
