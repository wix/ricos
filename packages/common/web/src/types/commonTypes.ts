import { CSSProperties } from 'react';
import { Styles as ReactModalStyles } from 'react-modal';
import { ComponentData } from '../index';

export { Pubsub, Store } from 'wix-rich-content-editor-common';

export type ModalStyles = ReactModalStyles;
export type Styles = Record<string, CSSProperties>;

export interface RichContentTheme {
  modalTheme?: ModalStyles;
  [propName: string]: string | ModalStyles | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Decorator = (theme: RichContentTheme, config?: Record<string, unknown>) => any;

export type ClassNameStrategy = (
  componentData: ComponentData,
  theme: RichContentTheme,
  styles: Styles,
  isMobile: boolean
) => string | CSSProperties;

export type ContainerClassNameStrategy = (theme: RichContentTheme) => CSSProperties;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TranslateFunction = (key: string, template?: any) => string;
