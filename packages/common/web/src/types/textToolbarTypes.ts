/* eslint-disable @typescript-eslint/no-explicit-any */
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
  settings: any;
  uiSettings: any;
  closeInlinePluginToolbar: () => void;
  getEditorBounds: GetEditorBounds;
  styles: Record<string, string>;
  icon: ReactComponentType;
};

type TextButtonMapper = (
  params: TextButtonMappingParams
) => {
  TextButtonMapper: () => { [type: string]: TextButtonMapping };
};
