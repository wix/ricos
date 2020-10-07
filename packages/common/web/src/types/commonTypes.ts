import { CSSProperties, ComponentType } from 'react';
import { Styles as ReactModalStyles } from 'react-modal';
import { ComponentData } from 'ricos-content';
import { Helpers, LegacyPluginConfig, ModalSettings } from '.';
import { EditorState } from 'draft-js';
import { BoundingRect } from 'react-measure';

export { Pubsub, Store } from 'wix-rich-content-editor-common';

export type ModalStyles = ReactModalStyles;
export type Styles = Record<string, CSSProperties>;

export interface RichContentTheme {
  modalTheme: ModalStyles;
  [propName: string]: string | ModalStyles | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Decorator = (theme: RichContentTheme, config: Record<string, unknown>) => any;

export type ClassNameStrategy = (
  componentData: ComponentData,
  theme: RichContentTheme,
  styles: Styles,
  isMobile: boolean
) => string | CSSProperties;

export type ContainerClassNameStrategy = (theme: RichContentTheme) => CSSProperties;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TranslateFunction = (key: string, template?: any) => string;

export type AnchorTarget = HTMLAnchorElement['target'];
export type RelValue = HTMLAnchorElement['rel'];

export type GetEditorBounds = () => Partial<BoundingRect>;

export type InnerModalType = {
  openInnerModal: ModalSettings['openModal'];
  closeInnerModal: ModalSettings['closeModal'];
};

export interface EditorContextType {
  theme: RichContentTheme;
  t: TranslateFunction;
  locale: string;
  anchorTarget: AnchorTarget;
  relValue: RelValue;
  helpers: Helpers;
  config: LegacyPluginConfig;
  isMobile: boolean;
  setEditorState: (editorState: EditorState) => void;
  getEditorState: () => EditorState;
  getEditorBounds: GetEditorBounds;
  languageDir: 'rtl' | 'ltr';
  shouldRenderOptimizedImages: boolean;
  siteDomain: string;
  iframeSandboxDomain: string;
  setInPluginEditingMode: (shouldEnable: boolean) => void;
  getInPluginEditingMode: () => boolean;
  innerModal: InnerModalType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  renderInnerRCE: (params: any) => JSX.Element;
}

export type ModalDecorations = {
  decorationMode: 'PREPEND' | 'WRAP' | 'APPEND';
  decorator: ComponentType;
}[];
