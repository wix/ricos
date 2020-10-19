import { RicosTheme } from './themeStrategy/themeTypes';
import {
  RicosContent,
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
import { RicosCssOverride, EditorPluginConfig, ViewerPluginConfig } from './types';
import { DRAFT_EDITOR_PROPS } from './consts';
import { RichContentEditorProps } from 'wix-rich-content-editor';
import { RichContentViewerProps } from 'wix-rich-content-viewer';

export type RichContentProps = Partial<RichContentEditorProps | RichContentViewerProps>;

export interface RicosProps {
  _rcProps?: RichContentProps; // For internal use by WixRicos only
  children?: ReactElement;
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
