type ModifierKey = 'command' | 'shift' | 'ctrl' | 'option';

type CommandHandler = (editorState: DraftEditorState) => unknown;

type KeyBinding = {
  keyCommand: {
    command: string;
    modifiers?: ModifierKey[];
    key: string;
  };
  commandHandler: CommandHandler;
};

type TextButtonMapping = {
  component: ReactComponentType;
  isMobile?: boolean;
  position?: {
    mobile?: number;
    desktop?: number;
  };
  keyBindings?: KeyBinding[];
};

type TextButtonMappingParams = {
  helpers: Helpers;
  isMobile: boolean;
  anchorTarget: string;
  relValue: string;
  t: TranslateFunction;
  theme: RichContentTheme;
  getEditorState: () => DraftEditorState;
  setEditorState: (editorState: DraftEditorState) => void;
  settings: unknown;
  uiSettings: unknown;
  closeInlinePluginToolbar: () => void;
  getEditorBounds?: () => import('react-measure').BoundingRect;
  styles?: Record<string, unknown>;
  icon?: ReactComponentType;
};

type TextButtonMapper = (
  params: TextButtonMappingParams
) => {
  TextButtonMapper: () => { [type: string]: TextButtonMapping };
};
