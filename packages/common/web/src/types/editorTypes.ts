import {
  UpdateEntityFunc,
  ImageComponentData,
  ComponentData,
  BICallbacks,
  LegacyPluginConfig,
  RichContentTheme,
  TranslationFunction,
  AnchorTarget,
  RelValue,
  GetEditorBounds,
  InnerModalType,
} from '.';
import { CSSProperties } from 'react';
import { EditorState } from 'draft-js';

export interface Helpers extends BICallbacksForHelpers {
  openModal?: (modalProps: Record<string, unknown>) => void;
  closeModal?: () => void;
  handleFileUpload?: (file: File, updateEntity: UpdateEntityFunc<ImageComponentData>) => void;
  handleFileSelection?: (
    index: number | undefined,
    multiple: boolean,
    updateEntity: UpdateEntityFunc<ImageComponentData[]>,
    removeEntity?: undefined,
    componentData?: ComponentData
  ) => void;
  onVideoSelected?: (
    url: string,
    updateEntity: (metadata: Record<string, unknown>) => void
  ) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [propName: string]: ((...args: any[]) => any) | undefined;
}

interface BICallbacksForHelpers extends BICallbacks {
  // makes version optional
  onPluginAdd?(pluginId: string, entryPoint: string, version?: string): void;
  onPluginAddSuccess?(pluginId: string, entryPoint: string, version?: string): void;
}

export type OnErrorFunction = (error: string) => void;

export type CustomStyleFn = (styles: CSSProperties) => CSSProperties;

export type TextToolbarType = 'inline' | 'static';

export type SetEditorState = (editorState: EditorState) => void;
export type GetEditorState = () => EditorState;

export interface EditorContextType {
  theme: RichContentTheme;
  t: TranslationFunction;
  locale: string;
  anchorTarget?: AnchorTarget;
  relValue?: RelValue;
  helpers: Helpers;
  config: LegacyPluginConfig;
  isMobile: boolean;
  setEditorState: (editorState: EditorState) => void;
  getEditorState: () => EditorState;
  getEditorBounds: GetEditorBounds;
  languageDir: 'rtl' | 'ltr';
  shouldRenderOptimizedImages?: boolean;
  siteDomain?: string;
  iframeSandboxDomain?: string;
  setInPluginEditingMode: (shouldEnable: boolean) => void;
  getInPluginEditingMode: () => boolean;
  innerModal: InnerModalType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  renderInnerRCE: (params: any) => JSX.Element;
}
