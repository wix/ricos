import { CSSProperties } from 'react';
import { Styles as ReactModalStyles } from 'react-modal';

export type ModalStyles = ReactModalStyles;
export type Styles = Record<string, CSSProperties>;

export interface RichContentTheme {
  modalTheme?: ModalStyles;
  [propName: string]: Styles | ModalStyles | undefined;
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

export interface ComponentData {
  config?: { alignment?: string; size?: string; url?: string; textWrap?: string };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  src?: any;
  srcType?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [propName: string]: any;
}

export type TranslateFunction = (key: string) => string;

export type NormalizeConfig = {
  anchorTarget?: string;
  relValue?: string;
  disableInlineImages?: boolean;
  removeInvalidInlinePlugins?: boolean;
};
