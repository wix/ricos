interface RichContentProps {
  config?: object;
  editorKey?: string;
  helpers?: Helpers;
  initialState?: RicosContent;
  isMobile?: boolean;
  locale?: string;
  localeResource?: object;
  ModalsMap?: ModalsMap;
  onChange?: OnChangeFunction;
  placeholder?: string;
  plugins?: PluginConfig[];
  textToolbarType?: TextToolbarType;
  theme?: object;
  onError?: OnErrorFunction;
}

interface ExportedRichContentProps extends RichContentProps {
  [propName: string]: any;
}

interface RicosProps {
  _rcProps?: RichContentProps; // For internal use by WixRicos only
  children?: RichContentChild;
  content?: RicosContent;
  isMobile?: boolean;
  locale?: string;
  palette?: Palette | PalettePreset;
  plugins?: PluginConfig[];
  theme?: object;
  onError?: OnErrorFunction;
}

interface RicosEditorProps extends RicosProps {
  placeholder?: string;
  toolbarSettings?: PalettePreset;
}

type PalettePreset = 'BackOffice' | 'DarkTheme';
type PalettePresets = { [propName in PalettePreset]: Palette };

type GetToolbarSettings = any; // Should be converted from flow types

type RicosViewerProps = RicosProps;

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
