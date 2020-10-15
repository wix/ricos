import { ButtonType, ModifierKey, ToolbarType } from './toolbarEnums';
import { BoundingRect } from 'react-measure';
import { ComponentType } from 'react';
import { EditorState } from 'draft-js';
import {
  ComponentData,
  ModalStyles,
  TranslateFunction,
  Styles,
  RichContentTheme,
  Helpers,
  Pubsub,
} from './index';

export type GetEditorBounds = () => BoundingRect;

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
  commonPubsub?: Pubsub;
};

export type ToolbarButtonProps = {
  type: string;
  name?: string;
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
  modalStylesFn?: ({ buttonRef: any, toolbarName: string }) => ModalStyles;
  section?: string;
};

interface CreateButtonsParams {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  settings: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  uiSettings: any;
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  innerModal: any;
}

export type CreateInlineButtons<K extends keyof CreateButtonsParams = keyof CreateButtonsParams> = (
  config: Pick<CreateButtonsParams, K>
) => InlineButton[];

export type CreateInsertButtons<K extends keyof CreateButtonsParams = keyof CreateButtonsParams> = (
  config: Pick<CreateButtonsParams, K>
) => InsertButton[];

type CommandHandler = (editorState: EditorState) => unknown;

type KeyBinding = {
  keyCommand: {
    command: string;
    modifiers?: ModifierKey[];
    key: string;
  };
  commandHandler: CommandHandler;
};

type TextButtonMapping = {
  component?: ComponentType;
  isMobile?: boolean;
  position?: {
    mobile?: number;
    desktop?: number;
  };
  keyBindings?: KeyBinding[];
  externalizedButtonProps: ToolbarButtonProps;
};

export type TextButtonMapper = (pubsub?: Pubsub) => { [type: string]: TextButtonMapping };

export type CreatePluginToolbar<K extends keyof CreateButtonsParams = keyof CreateButtonsParams> = (
  config: Pick<CreateButtonsParams, K>
) => {
  name: string;
  InlineButtons?: InlineButton[];
  InsertButtons?: InsertButton[];
  TextButtonMapper?: TextButtonMapper;
};
