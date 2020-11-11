import { ComponentType } from 'react';
import { EditorState } from 'draft-js';
import {
  ComponentData,
  ModalStyles,
  TranslationFunction,
  Pubsub,
  GetEditorBounds,
  ButtonType,
  ModifierKey,
  ToolbarType,
  ModalDecorations,
} from '.';

export type InlineButton = {
  type: ButtonType;
  keyName: string;
  icon?: (props) => JSX.Element;
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
  t?: TranslationFunction;
  anchorTarget?: string;
  relValue?: string;
  disabled?: boolean;
  desktop?: boolean;
  getEditorBounds?: GetEditorBounds;
};

export type ToolbarButtonProps = {
  type?: string;
  tooltip?: string;
  toolbars?: ToolbarType[];
  getIcon?: () => ComponentType;
  getLabel?: () => string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClick?: (e: any & { ref?: any; render?: any }) => void;
  isActive?: () => boolean;
  isDisabled?: () => boolean;
  onChange?: (files: File[]) => void;
  accept?: string;
  multiple?: boolean;
  dataHook?: string;
  name?: string;
};

export type InsertButton = ToolbarButtonProps & {
  name: string;
  componentData?: ComponentData;
  modalElement?: ComponentType;
  modalStyles?: ModalStyles;
  modalStylesFn?: (params: {
    buttonRef: HTMLElement;
    toolbarName: ToolbarType;
    pubsub?: Pubsub;
  }) => ModalStyles;
  section?: string;
  modalName?: string;
  modalDecorations?: ModalDecorations;
  multi?: boolean;
  addBlockHandler?: (editorState: EditorState) => void;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type CreateInlineButtons = (config?: any) => InlineButton[];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type CreateInsertButtons = (config?: any) => InsertButton[];

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

export type CreatePluginToolbar = (
  config
) => {
  name: string;
  InlineButtons?: InlineButton[];
  InlinePluginToolbarButtons?: InlineButton[]; // TODO: this looks like a duplicate. Should be removed.
  InsertButtons?: InsertButton[];
  TextButtonMapper?: TextButtonMapper;
  commonPubsub?: Pubsub;
};
