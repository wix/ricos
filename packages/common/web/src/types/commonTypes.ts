/* eslint-disable @typescript-eslint/no-explicit-any */
interface RichContentTheme {
  modalTheme?: ModalStyles;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [propName: string]: any;
}

type ModalStyles = { content?: Record<string, unknown>; overlay?: Record<string, unknown> };

type ClassNameStrategy = (
  componentData: Record<string, unknown>,
  theme: RichContentTheme,
  styles: Record<string, unknown>,
  isMobile: boolean
) => string;

type TranslateFunction = (key: string) => string;

type ReactComponentType = import('react').ComponentType;
