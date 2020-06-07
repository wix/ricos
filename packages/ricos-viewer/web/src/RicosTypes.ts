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
  onChange?(editorState: import('draft-js').EditorState): void;
  onError?: OnErrorFunction;
  placeholder?: string;
  plugins?: PluginConfig[];
  textToolbarType?: TextToolbarType;
  theme?: RicosCssOverride;
  typeMappers?: TypeMapper[];
}

interface ExportedRichContentProps extends RichContentProps {
  [propName: string]: any;
}

interface RicosProps {
  _rcProps?: RichContentProps; // For internal use by WixRicos only
  children?: RichContentChild;
  content?: RicosContent;
  cssOverride?: RicosCssOverride;
  isMobile?: boolean;
  locale?: string;
  onError?: OnErrorFunction;
  plugins?: PluginConfig[];
  theme?: RicosTheme;
}

interface RicosEditorProps extends RicosProps {
  modalSettings?: ModalSettings;
  onChange?: OnContentChangeFunction;
  placeholder?: string;
  toolbarSettings?: ToolbarSettings;
}

type RicosViewerProps = RicosProps;

interface RicosTheme {
  palette?: Palette | PalettePreset;
}

type GetToolbarSettings = any; // Should be converted from flow types

type RichContentChild = import('react').ReactElement<ExportedRichContentProps>;

interface ModalSettings {
  openModal?: (data: object) => void;
  closeModal?: () => void;
  container?: string;
}

type TextToolbarType = 'inline' | 'static';

interface ToolbarSettings {
  getToolbarSettings?: GetToolbarSettings;
  textToolbarContainer?: HTMLElement;
  useStaticTextToolbar?: boolean;
}

type Helpers = { [propName: string]: ((...args: any[]) => any) | undefined };

interface EditorDataInstance {
  getContentState: () => RicosContent;
  refresh: (editorState: import('draft-js').EditorState) => void;
}

type OnContentChangeFunction = (content: RicosContent) => void;

type OnErrorFunction = (error: string) => void;
