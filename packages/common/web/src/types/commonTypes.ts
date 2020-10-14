import { CSSProperties, ComponentType } from 'react';
import { Styles as ReactModalStyles } from 'react-modal';
import { ComponentData } from 'ricos-content';
import { ModalSettings, DecorationMode } from '.';
import { BoundingRect } from 'react-measure';
import { ContentBlock, SelectionState, EditorState } from 'draft-js';

export { Pubsub, Store } from '../Utils/simplePubsub';

export type ModalStyles = ReactModalStyles;
export type Styles = Record<string, CSSProperties>;

export type RichContentTheme = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [propName: string]: any;
  modalTheme?: ModalStyles;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Decorator = (theme: RichContentTheme, config: Record<string, unknown>) => any;

export type ClassNameStrategy = (
  componentData: ComponentData,
  theme: RichContentTheme,
  styles: Styles,
  isMobile: boolean
) => string;

export type ContainerClassNameStrategy = (theme: RichContentTheme) => string;

export { TranslationFunction, ResourceKey as LocaleResource } from 'i18next';

export type AnchorTarget = HTMLAnchorElement['target'];
export type RelValue = HTMLAnchorElement['rel'];

export type GetEditorBounds = () => BoundingRect | undefined;

export type InnerModalType = {
  openInnerModal: ModalSettings['openModal'];
  closeInnerModal: ModalSettings['closeModal'];
};

export type ModalDecorations = {
  decorationMode: DecorationMode;
  decorator: ComponentType;
}[];

export type OnConfirmFunction = (
  data
) => {
  newBlock: ContentBlock;
  newSelection: SelectionState;
  newEditorState: EditorState;
};
