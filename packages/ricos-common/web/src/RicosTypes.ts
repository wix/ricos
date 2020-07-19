import { Decorator, Helpers, GetToolbarSettings } from 'wix-rich-content-common';
import { EditorState } from 'draft-js';
import { ReactElement } from 'react';
import {
  RicosContent,
  RicosCssOverride,
  Palette,
  PalettePreset,
  InlineStyleMapper,
  ModalsMap,
  PluginConfig,
  TypeMapper,
  PreviewSettings,
} from './types';

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
  plugins?: PluginConfig[];
  textToolbarType?: TextToolbarType;
  theme?: RicosCssOverride;
  typeMappers?: TypeMapper[];
  transformation?: Record<string, unknown>;
  seoMode?: boolean | Record<string, unknown>;
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
  locale?: string;
  onError?: OnErrorFunction;
  plugins?: PluginConfig[];
  theme?: RicosTheme;
}

export interface RicosEditorProps extends RicosProps {
  modalSettings?: ModalSettings;
  onChange?: OnContentChangeFunction;
  placeholder?: string;
  toolbarSettings?: ToolbarSettings;
}

export interface RicosViewerProps extends RicosProps {
  preview?: PreviewSettings;
}

export interface RicosTheme {
  palette?: Palette | PalettePreset;
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
}

export type OnContentChangeFunction = (content: RicosContent) => void;

export type OnErrorFunction = (error: string) => void;
