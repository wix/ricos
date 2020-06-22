/* eslint-disable @typescript-eslint/no-explicit-any */

type ButtonType = import('./toolbarEnums').ButtonType;

type GetEditorBounds = () => import('react-measure').BoundingRect;

type InlineButton = {
  type: ButtonType;
  keyName: string;
  icon?: ReactComponentType;
  mobile?: boolean;
  mapComponentDataToButtonProps?: (componentData: ComponentData) => Partial<InlineButton>;
  tooltipTextKey?: string;
  multiple?: boolean;
  onFilesSelected?: (pubsub: Pubsub, files: any[]) => void;
  panelContent?: ReactComponentType;
  min?: number;
  max?: number;
  inputMax?: number;
  modalName?: string;
  modalStyles?: any;
  t?: TranslateFunction;
  anchorTarget?: string;
  relValue?: string;
  disabled?: boolean;
  desktop?: boolean;
  getEditorBounds?: GetEditorBounds;
};

type InsertButton = {
  type?: string;
  name?: string;
  tooltipText?: string;
  toolbars?: ToolbarType[];
  Icon?: ReactComponentType;
  componentData?: ComponentData;
  helpers?: Helpers;
  t?: TranslateFunction;
  modalElement?: ReactComponentType;
  modalStyles?: any;
};

interface CreateButtonsParams {
  settings: any;
  t: TranslateFunction;
  styles: Record<string, unknown>;
  anchorTarget: string;
  relValue: string;
  isMobile: boolean;
  uiSettings: any;
  helpers: Helpers;
  closeInlinePluginToolbar: () => void;
  getEditorBounds: GetEditorBounds;
  getEditorState: () => DraftEditorState;
  setEditorState: (editorState: DraftEditorState) => void;
  customTooltip: string;
  UndoButton: ReactComponentType;
  RedoButton: ReactComponentType;
  addBlockHandler: (editorState: DraftEditorState) => void;
  icon: ReactComponentType;
  theme: RichContentTheme;
}

type CreateInlineButtons<K extends keyof CreateButtonsParams = keyof CreateButtonsParams> = (
  config: Pick<CreateButtonsParams, K>
) => InlineButton[];

type CreateInsertButtons<K extends keyof CreateButtonsParams = keyof CreateButtonsParams> = (
  config: Pick<CreateButtonsParams, K>
) => InsertButton[];

type ModifierKey = import('./toolbarEnums').ModifierKey;

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
  Undo?: TextButtonMapping;
  Redo?: TextButtonMapping;
};

type TextButtonMapper = (pubsub?: Pubsub) => { [type: string]: TextButtonMapping };

type CreatePluginToolbar<K extends keyof CreateButtonsParams = keyof CreateButtonsParams> = (
  config: Pick<CreateButtonsParams, K>
) => {
  name: string;
  InlineButtons?: InlineButton[];
  InsertButtons?: InsertButton[];
  TextButtonMapper?: TextButtonMapper;
};
