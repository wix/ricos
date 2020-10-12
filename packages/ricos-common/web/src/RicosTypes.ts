import { RicosTheme } from './themeStrategy/themeTypes';
import {
  Decorator,
  Helpers,
  PluginTypeMapper,
  RicosContent,
  CreatePluginFunction,
  OnErrorFunction,
  LinkSettings,
  SEOSettings,
  MediaSettings,
  LinkPanelSettings,
  ModalSettings,
  ToolbarSettings,
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
} from './types';

import { DRAFT_EDITOR_PROPS } from './consts';

export interface RichContentProps {
  config?: Record<string, unknown>;
  decorators?: Decorator[];
  editorKey?: string;
  setEditorToolbars?(ref: unknown): void;
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
  textToolbarType?: 'inline' | 'static';
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
  theme?: RicosTheme;
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

export interface EditorDataInstance {
  getContentState: () => RicosContent;
  refresh: (editorState: EditorState) => void;
  waitForUpdate: () => void;
  getContentStatePromise: () => Promise<RicosContent>;
}

export type OnContentChangeFunction = (content: RicosContent) => void;

export type OnBusyChangeFunction = (isBusy: boolean) => void;

// draft-js props - https://draftjs.org/docs/api-reference-editor
export type DraftEditorSettings = Pick<EditorProps, typeof DRAFT_EDITOR_PROPS[number]>;
