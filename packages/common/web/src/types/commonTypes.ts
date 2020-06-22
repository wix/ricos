/* eslint-disable @typescript-eslint/no-explicit-any */
interface RichContentTheme {
  modalTheme?: ModalStyles;
  [propName: string]: string | ModalStyles | undefined;
}

type ModalStyles = { content?: Record<string, unknown>; overlay?: Record<string, unknown> };

type Styles = Record<string, string>;

type ClassNameStrategy = (
  componentData: ComponentData,
  theme: RichContentTheme,
  styles: Styles,
  isMobile: boolean
) => string;

interface ComponentData {
  config?: { alignment?: string; size?: string; url?: string; textWrap?: string };
  src?: any;
  srcType?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [propName: string]: any;
}

type TranslateFunction = (key: string) => string;

type ReactComponentType = import('react').ComponentType;
