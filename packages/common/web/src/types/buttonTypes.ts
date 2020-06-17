/* eslint-disable @typescript-eslint/no-explicit-any */
type ButtonType =
  | 'file'
  | 'toggle'
  | 'panel'
  | 'inline-panel'
  | 'external-modal'
  | 'dropdown'
  | 'separator'
  | 'size-original'
  | 'size-small-center'
  | 'size-small-left'
  | 'size-small-right'
  | 'size-content'
  | 'size-full-width'
  | 'size-small'
  | 'size-medium'
  | 'size-large'
  | 'alignment-left'
  | 'alignment-center'
  | 'alignment-right'
  | 'width'
  | 'height'
  | 'link'
  | 'delete'
  | 'custom';

type InlineButton = {
  type: ButtonType;
  keyName: string;
  icon?: ReactComponentType;
  mobile?: boolean;
  mapComponentDataToButtonProps?: (componentData: Record<string, unknown>) => InlineButton;
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
  getEditorBounds?: () => any;
};

type CreateInlineButtons = ({
  t,
  styles,
  anchorTarget,
  relValue,
  isMobile,
  uiSettings,
  settings,
  closeInlinePluginToolbar,
  getEditorBounds,
}: {
  t: TranslateFunction;
  styles: Record<string, unknown>;
  anchorTarget: string;
  relValue: string;
  isMobile: boolean;
  uiSettings: any;
  settings: any;
  closeInlinePluginToolbar: () => void;
  getEditorBounds?: () => any;
}) => InlineButton[];

type InsertButton = {
  type?: string;
  name: string;
  tooltipText: string;
  toolbars: ToolbarType[];
  Icon: ReactComponentType;
  componentData: any;
  helpers: Helpers;
  t?: TranslateFunction;
  modalElement?: ToolbarType;
  modalStyles?: any;
};

type CreateInsertButtons = ({
  helpers: Helpers,
  t: TranslateFunction,
  settings: any,
}) => InsertButton[];
