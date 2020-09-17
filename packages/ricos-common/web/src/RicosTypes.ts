import {
  Decorator,
  Helpers,
  GetToolbarSettings,
  PluginTypeMapper,
  RicosContent,
} from 'wix-rich-content-common';
import { EditorState, EditorProps } from 'draft-js';
import { PreviewConfig } from 'wix-rich-content-preview';
import { ReactElement } from 'react';
import {
  RicosCssOverride,
  InlineStyleMapper,
  ModalsMap,
  EditorPluginConfig,
  ViewerPluginConfig,
  CreatePluginFunction,
  ThemeStrategyCreatorFunction,
} from './types';

import { DRAFT_EDITOR_PROPS } from './consts';

export interface RichContentProps {
  config?: Record<string, unknown>;
  decorators?: Decorator[];
  editorKey?: string;
  helpers?: Helpers;
  initialState?: RicosContent;
  inlineStyleMappers?: InlineStyleMapper[];
  isMobile?: boolean;
  locale?: string;
  localeResource?: Record<string, unknown>;
  ModalsMap?: ModalsMap;
  onChange?(editorState: EditorState): void;
  onError?: OnErrorFunction;
  placeholder?: string;
  plugins?: CreatePluginFunction[];
  textToolbarType?: TextToolbarType;
  theme?: RicosCssOverride;
  typeMappers?: PluginTypeMapper[];
  transformation?: Record<string, unknown>;
  seoMode?: boolean | SEOSettings;
  disabled?: boolean;
  anchorTarget?: string;
  relValue?: string;
}

export interface ExportedRichContentProps extends RichContentProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [propName: string]: any;
}

export interface RicosProps {
  _rcProps?: RichContentProps; // For internal use by WixRicos only
  children?: RichContentChild;
  content?: RicosContent;
  cssOverride?: RicosCssOverride;
  isMobile?: boolean;
  linkSettings?: LinkSettings;
  locale?: string;
  mediaSettings?: MediaSettings;
  onError?: OnErrorFunction;
  theme?: ThemeStrategyCreatorFunction;
}

export interface RicosEditorProps extends RicosProps {
  plugins?: EditorPluginConfig[];
  draftEditorSettings?: DraftEditorSettings;
  linkPanelSettings?: LinkPanelSettings;
  modalSettings?: ModalSettings;
  onChange?: OnContentChangeFunction;
  placeholder?: string;
  toolbarSettings?: ToolbarSettings;
  onBusyChange?: OnBusyChangeFunction;
}

export interface RicosViewerProps extends RicosProps {
  plugins?: ViewerPluginConfig[];
  preview?: PreviewConfig;
  seoSettings?: boolean | SEOSettings;
}

export type RichContentChild = ReactElement<ExportedRichContentProps>;

export interface ModalSettings {
  openModal?: (data: Record<string, unknown>) => void;
  closeModal?: () => void;
  ariaHiddenId?: string;
}

export type TextToolbarType = 'inline' | 'static';

export interface ToolbarSettings {
  getToolbarSettings?: GetToolbarSettings;
  textToolbarContainer?: HTMLElement;
  useStaticTextToolbar?: boolean;
}

export interface EditorDataInstance {
  getContentState: () => RicosContent;
  refresh: (editorState: EditorState) => void;
  waitForUpdate: () => void;
  getContentStatePromise: () => Promise<RicosContent>;
}

export type OnContentChangeFunction = (content: RicosContent) => void;

export type OnErrorFunction = (error: string) => void;

export type OnBusyChangeFunction = (isBusy: boolean) => void;

// draft-js props - https://draftjs.org/docs/api-reference-editor
export type DraftEditorSettings = Pick<EditorProps, typeof DRAFT_EDITOR_PROPS[number]>;

export interface MediaSettings {
  pauseMedia?: boolean;
  disableRightClick?: boolean;
}

export interface LinkSettings {
  anchorTarget?: HTMLAnchorElement['target'];
  relValue?: HTMLAnchorElement['rel'];
}

export interface LinkPanelSettings {
  blankTargetToggleVisibilityFn?: (anchorTarget?: HTMLAnchorElement['target']) => boolean;
  nofollowRelToggleVisibilityFn?: (relValue?: HTMLAnchorElement['rel']) => boolean;
  placeholder?: string;
}

export interface SEOSettings {
  paywall: {
    className: string;
    index: number;
  };
}
