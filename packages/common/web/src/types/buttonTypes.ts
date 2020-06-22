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

interface CreateInlineButtonsParams {
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
}

interface A extends CreateInlineButtonsParams {
  t: any;
}

type CreateInlineButtons<
  K extends keyof CreateInlineButtonsParams = keyof CreateInlineButtonsParams
> = (params: Pick<CreateInlineButtonsParams, K>) => InlineButton[];

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

interface CreateInsertButtonsParams {
  helpers?: Helpers;
  t?: TranslateFunction;
  settings?: any;
  isMobile?: boolean;
  getEditorState?: () => DraftEditorState;
  setEditorState?: (editorState: DraftEditorState) => void;
  customTooltip?: string;
  styles?: Record<string, unknown>;
  UndoButton?: ReactComponentType;
  RedoButton?: ReactComponentType;
  addBlockHandler?: (editorState: DraftEditorState) => void;
  icon?: ReactComponentType;
}

type CreateInsertButtons = (params: CreateInsertButtonsParams) => InsertButton[];
