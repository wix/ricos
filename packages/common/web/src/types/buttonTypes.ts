import { ComponentType, Ref } from 'react';
import { EditorState } from 'draft-js';
import {
  ComponentData,
  ModalStyles,
  TranslateFunction,
  Styles,
  RichContentTheme,
  Helpers,
  Pubsub,
  GetEditorBounds,
  PluginConfig,
  UISettings,
  InnerModalType,
  ButtonType,
  ModifierKey,
  ToolbarType,
  ModalDecorations,
} from '.';

export type InlineButton = {
  type: ButtonType;
  keyName: string;
  icon?: ComponentType;
  mobile?: boolean;
  mapComponentDataToButtonProps?: (componentData: ComponentData) => Partial<InlineButton>;
  tooltipTextKey?: string;
  multiple?: boolean;
  onFilesSelected?: (pubsub: Pubsub, files: File[]) => void;
  panelContent?: ComponentType;
  min?: number;
  max?: number;
  inputMax?: number;
  modalName?: string;
  modalStyles?: ModalStyles;
  t?: TranslateFunction;
  anchorTarget?: string;
  relValue?: string;
  disabled?: boolean;
  desktop?: boolean;
  getEditorBounds?: GetEditorBounds;
};

export type ToolbarButtonProps = {
  type: string;
  name: string;
  tooltip: string;
  toolbars?: ToolbarType[];
  getIcon?: () => ComponentType;
  getLabel?: () => string;
  onClick?: (args?: any) => void; // eslint-disable-line
  isActive?: () => boolean;
  isDisabled?: () => boolean;
  onChange?: (e: Event) => void;
  accept?: string;
  multiple?: boolean;
};

export type InsertButton = ToolbarButtonProps & {
  componentData?: ComponentData;
  modalElement?: ComponentType;
  modalStyles?: ModalStyles;
  modalStylesFn?: (params: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    buttonRef: Ref<any>;
    toolbarName: ToolbarType;
    pubsub?: Pubsub;
  }) => ModalStyles;
  section?: string;
  modalName?: string;
  modalDecorations?: ModalDecorations;
  multi?: boolean;
};

interface CreatePluginToolbarConfig {
  settings: PluginConfig;
  uiSettings: UISettings;
  t: TranslateFunction;
  locale?: string;
  styles: Styles;
  anchorTarget: string;
  relValue: string;
  isMobile: boolean;
  helpers: Helpers;
  closeInlinePluginToolbar: () => void;
  getEditorBounds: GetEditorBounds;
  getEditorState: () => EditorState;
  setEditorState: (editorState: EditorState) => void;
  customTooltip: string;
  UndoButton: ComponentType;
  RedoButton: ComponentType;
  addBlockHandler: (editorState: EditorState) => void;
  icon: ComponentType;
  theme: RichContentTheme;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  LINK: any;
  innerModal: InnerModalType;
}

export type CreateInlineButtons<
  K extends keyof CreatePluginToolbarConfig = keyof CreatePluginToolbarConfig
> = (config: Pick<CreatePluginToolbarConfig, K>) => InlineButton[];

export type CreateInsertButtons<
  K extends keyof CreatePluginToolbarConfig = keyof CreatePluginToolbarConfig
> = (config: Pick<CreatePluginToolbarConfig, K>) => InsertButton[];

type CommandHandler = (editorState: EditorState) => unknown;

type KeyBinding = {
  keyCommand: {
    command: string;
    modifiers?: ModifierKey[];
    key: string;
  };
  commandHandler: CommandHandler;
};

export type TextButtonMapping = {
  [type: string]: {
    component?: ComponentType;
    isMobile?: boolean;
    position?: {
      mobile?: number;
      desktop?: number;
    };
    keyBindings?: KeyBinding[];
    externalizedButtonProps: ToolbarButtonProps;
  };
};

export type TextButtonMapper = (pubsub?: Pubsub) => TextButtonMapping;

export type CreatePluginToolbar<
  K extends keyof CreatePluginToolbarConfig = keyof CreatePluginToolbarConfig
> = (
  config: Pick<CreatePluginToolbarConfig, K>
) => {
  name: string;
  InlineButtons?: InlineButton[];
  InlinePluginToolbarButtons?: InlineButton[]; // TODO: this looks like a duplicate. Should be removed.
  InsertButtons?: InsertButton[];
  TextButtonMapper?: TextButtonMapper;
};
