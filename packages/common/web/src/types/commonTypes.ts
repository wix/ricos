/* eslint-disable @typescript-eslint/no-explicit-any */
interface RichContentTheme {
  modalTheme?: ModalStyles;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [propName: string]: any;
}

type ModalStyles = { content?: Record<string, unknown>; overlay?: Record<string, unknown> };

interface Helpers {
  openModal?: (modalProps: Record<string, unknown>) => void;
  closeModal?: () => void;
  handleFileUpload?: (file: File, updateEntity: UpdateEntityFunc<ImageComponentData>) => void;
  handleFileSelection?: (
    index: number | undefined,
    multiple: boolean,
    updateEntity: UpdateEntityFunc<ImageComponentData[]>
  ) => void;
  onVideoSelected?: (
    url: string,
    updateEntity: (metadata: Record<string, unknown>) => void
  ) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [propName: string]: ((...args: any[]) => any) | undefined;
}

type ClassNameStrategy = (
  componentData: Record<string, unknown>,
  theme: RichContentTheme,
  styles: Record<string, unknown>,
  isMobile: boolean
) => string;

type TranslateFunction = (key: string) => string;

type Store = {
  update: (key: string, newData: any) => void;
  set: (param: any, param2?: any) => void;
  get: (key: string) => any;
};

type Pubsub = {
  getBlockHandler: (key: string) => any;
  subscribe: (key: string, callback: (...args: any[]) => any) => void;
  unsubscribe: (key: string, callback: (...args: any[]) => any) => void;
  update: (key: string, newData: any) => void;
  set: (param: any, param2?: any) => void;
  get: (key: string) => any;
  store: Store;
};
