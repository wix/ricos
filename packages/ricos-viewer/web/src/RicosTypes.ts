interface RichContentProps {
  config?: object;
  decorators?: Decorator[];
  editorKey?: string;
  helpers?: Helpers;
  initialState?: RicosContent;
  inlineStyleMappers?: InlineStyleMapper[];
  isMobile?: boolean;
  locale?: string;
  localeResource?: object;
  ModalsMap?: ModalsMap;
  onChange?: OnChangeFunction;
  onError?: OnErrorFunction;
  placeholder?: string;
  plugins?: PluginConfig[];
  textToolbarType?: TextToolbarType;
  theme?: CssOverride;
  typeMappers?: TypeMapper[];
}

interface ExportedRichContentProps extends RichContentProps {
  [propName: string]: any;
}

interface RicosProps {
  _rcProps?: RichContentProps; // For internal use by WixRicos only
  children?: RichContentChild;
  content?: RicosContent;
  cssOverride?: CssOverride;
  isMobile?: boolean;
  locale?: string;
  onError?: OnErrorFunction;
  plugins?: PluginConfig[];
  theme?: RicosTheme;
}

interface RicosEditorProps extends RicosProps {
  placeholder?: string;
  toolbarSettings?: ToolbarSettings;
}

type RicosViewerProps = RicosProps;

interface RicosTheme {
  palette?: Palette | PalettePreset;
}

type GetToolbarSettings = any; // Should be converted from flow types

type RichContentChild = import('react').ReactElement<ExportedRichContentProps>;

type TextToolbarType = 'inline' | 'static';

interface ToolbarSettings {
  useStaticTextToolbar?: boolean;
  textToolbarContainer?: HTMLElement;
  getToolbarSettings?: GetToolbarSettings;
}

type Helpers = { [propName: string]: (...args: any[]) => any };

interface EditorDataInstance {
  getContentState: () => RicosContent;
  refresh: (editorState: import('draft-js').EditorState) => void;
}

type OnChangeFunction = (editorState: import('draft-js').EditorState) => void;

type OnErrorFunction = (error: string) => void;
