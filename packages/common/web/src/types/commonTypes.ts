type CSSProperties = import('react').CSSProperties;

type Styles = Record<string, CSSProperties>;

type ModalStyles = import('react-modal').Styles;

interface RichContentTheme {
  modalTheme?: ModalStyles;
  [propName: string]: Styles | ModalStyles | undefined;
}

type ClassNameStrategy = (
  componentData: ComponentData,
  theme: RichContentTheme,
  styles: Styles,
  isMobile: boolean
) => string | CSSProperties;

type ContainerClassNameStrategy = (theme: RichContentTheme) => CSSProperties;

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
