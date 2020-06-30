interface RichContentProps {
  config?: Record<string, unknown>;
  decorators?: import('wix-rich-content-common').Decorator[];
  editorKey?: string;
  helpers?: import('wix-rich-content-common').Helpers;
  initialState?: RicosContent;
  inlineStyleMappers?: InlineStyleMapper[];
  isMobile?: boolean;
  locale?: string;
  localeResource?: Record<string, unknown>;
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

type RichContentChild = import('react').ReactElement<ExportedRichContentProps>;

interface ModalSettings {
  openModal?: (data: Record<string, unknown>) => void;
  closeModal?: () => void;
  ariaHiddenId?: string;
}

type TextToolbarType = 'inline' | 'static';

interface ToolbarSettings {
  getToolbarSettings?: import('wix-rich-content-common').GetToolbarSettings;
  textToolbarContainer?: HTMLElement;
  useStaticTextToolbar?: boolean;
}

interface EditorDataInstance {
  getContentState: () => RicosContent;
  refresh: (editorState: import('draft-js').EditorState) => void;
}

type OnContentChangeFunction = (content: RicosContent) => void;

type OnErrorFunction = (error: string) => void;
