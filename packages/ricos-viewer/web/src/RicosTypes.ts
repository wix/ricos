interface RichContentProps {
  locale?: string;
  localeResource?: object;
  placeholder?: string;
  editorKey?: string;
  onChange?: OnChangeFunction;
  initialState?: RicosContent;
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
  content?: RicosContent;
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

interface EditorDataInstance {
  getContentState: () => RicosContent;
  refresh: (editorState: import('draft-js').EditorState) => void;
}

type OnChangeFunction = (editorState: import('draft-js').EditorState) => void;
