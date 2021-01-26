import { RicosTheme } from './themeStrategy/themeTypes';
import {
  RicosContent as RicosDraftContent,
  OnErrorFunction,
  SEOSettings,
  LinkPanelSettings,
  GetToolbarSettings,
  AnchorTarget,
  RelValue,
  EditorPlugin,
  ViewerPlugin,
} from 'wix-rich-content-common';
import { EditorState, EditorProps } from 'draft-js';
import { PreviewConfig } from 'wix-rich-content-preview';
import { ReactElement } from 'react';
import { RicosCssOverride } from './types';
import { DRAFT_EDITOR_PROPS } from './consts';
import { RichContentEditorProps } from 'wix-rich-content-editor';
import { RichContentViewerProps } from 'wix-rich-content-viewer';
import { RicosContent } from 'ricos-schema';

export type RichContentProps = Partial<RichContentEditorProps | RichContentViewerProps>;

export interface RicosProps {
  /* Changes to this interface should also be reflected in the API docs */
  _rcProps?: RichContentProps; // For internal use by WixRicos only
  children?: ReactElement;
  content?: RicosDraftContent | RicosContent;
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
  plugins?: EditorPlugin[];
  draftEditorSettings?: DraftEditorSettings;
  linkPanelSettings?: LinkPanelSettings;
  modalSettings?: ModalSettings;
  onChange?: OnContentChangeFunction;
  onRicosContentChange?: OnRicosContentChangeFunction;
  placeholder?: string;
  toolbarSettings?: ToolbarSettings;
  onBusyChange?: OnBusyChangeFunction;
<<<<<<< HEAD
  injectedContent?: RicosDraftContent | RicosContent;
=======
  injectedContent?: RicosContent;
  maxTextLength?: number;
>>>>>>> master
  editorEvents?: {
    subscribe: (
      event: string,
      callback: () => Promise<{ type: string; data: unknown }>
    ) => (event: string, callback: () => Promise<{ type: string; data: unknown }>) => void;
    unsubscribe: (event: string, callback: () => Promise<{ type: string; data: unknown }>) => void;
    dispatch: (event: string) => Promise<unknown>;
  };
  /* Changes to this interface should also be reflected in the API docs */
}

export interface RicosViewerProps extends RicosProps {
  /* Changes to this interface should also be reflected in the API docs */
  plugins?: ViewerPlugin[];
  preview?: PreviewConfig;
  seoSettings?: boolean | SEOSettings;
  /* Changes to this interface should also be reflected in the API docs */
}

export interface ContentStateGetterArgs {
  shouldRemoveErrorBlocks?: boolean;
}

export type ContentStateGetter = (args?: ContentStateGetterArgs) => RicosDraftContent;

export interface EditorDataInstance {
  getContentState: ContentStateGetter;
  getEditorState: () => EditorState;
  refresh: (
    editorState: EditorState,
    contentTraits: { isEmpty: boolean; isContentChanged: boolean }
  ) => void;
  waitForUpdate: () => void;
  getContentStatePromise: () => Promise<RicosDraftContent>;
}

export type OnContentChangeFunction = (
  content: RicosDraftContent,
  contentTraits: { isEmpty: boolean; isContentChanged: boolean }
) => void;

export type OnRicosContentChangeFunction = (
  content: RicosContent,
  contentTraits: { isEmpty: boolean; isContentChanged: boolean }
) => void;

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

export type FullscreenProps = { backgroundColor?: string; foregroundColor?: string };

export interface MediaSettings {
  pauseMedia?: boolean;
  disableRightClick?: boolean;
  fullscreenProps?: FullscreenProps;
}

export interface LinkSettings {
  anchorTarget?: AnchorTarget;
  relValue?: RelValue;
}
