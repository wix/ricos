interface RichContentTheme {
  modalTheme?: ModalStyles;
  [propName: string]: string | ModalStyles | undefined;
}

type Styles = Record<string, string>;

type ModalStyles = { content?: Styles; overlay?: Styles };

type ClassNameStrategy = (
  componentData: ComponentData,
  theme: RichContentTheme,
  styles: Styles,
  isMobile: boolean
) => string;

interface ComponentData {
  config?: { alignment?: string; size?: string; url?: string; textWrap?: string };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  src?: any;
  srcType?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [propName: string]: any;
}

type TranslateFunction = (key: string) => string;

type ReactComponentType = import('react').ComponentType;
