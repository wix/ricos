interface RichContentProps {
  locale?: string;
  localeResource?: object;
  placeholder?: string;
  editorKey?: string;
  onChange?(editorState: EditorState): void;
  initialState?: InitialState;
  theme?: object;
  config?: object;
  plugins?: PluginConfig[];
  ModalsMap?: ModalsMap;
  helpers?: { [propName: string]: (...args: any[]) => any };
}

interface RichContentWrapperProps {
  children?: ReactElement;
  theme?: string | object;
  locale?: string;
  palette?: Palette;
  plugins?: PluginConfig[];
  editor?: boolean;
  rcProps?: RichContentProps;
}

type InitialState = { blocks: object[]; entityMap: { [index: number]: object } };
