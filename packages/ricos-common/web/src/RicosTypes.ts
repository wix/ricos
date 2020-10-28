import { RicosTheme } from './themeStrategy/themeTypes';
import {
  RicosContent,
  OnErrorFunction,
  SEOSettings,
  LinkPanelSettings,
  GetToolbarSettings,
  AnchorTarget,
  RelValue,
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
  /* Changes to this interface should also be reflected in the API docs */
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
  /* Changes to this interface should also be reflected in the API docs */
}

export interface RicosEditorProps extends RicosProps {
  /* Changes to this interface should also be reflected in the API docs */
  plugins?: EditorPluginConfig[];
  draftEditorSettings?: DraftEditorSettings;
  linkPanelSettings?: LinkPanelSettings;
  modalSettings?: ModalSettings;
  onChange?: OnContentChangeFunction;
  placeholder?: string;
  toolbarSettings?: ToolbarSettings;
  onBusyChange?: OnBusyChangeFunction;
  /* Changes to this interface should also be reflected in the API docs */
}

export interface RicosViewerProps extends RicosProps {
  /* Changes to this interface should also be reflected in the API docs */
  plugins?: ViewerPluginConfig[];
  preview?: PreviewConfig;
  seoSettings?: boolean | SEOSettings;
  /* Changes to this interface should also be reflected in the API docs */
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

export interface ModalSettings {
  openModal?: (data: Record<string, unknown>) => void;
  closeModal?: () => void;
  ariaHiddenId?: string;
  container?: HTMLElement;
}

export interface ToolbarSettings {
  getToolbarSettings?: GetToolbarSettings;
  textToolbarContainer?: HTMLElement;
  useStaticTextToolbar?: boolean;
}

export interface MediaSettings {
  pauseMedia?: boolean;
  disableRightClick?: boolean;
}

export interface LinkSettings {
  anchorTarget?: AnchorTarget;
  relValue?: RelValue;
}
