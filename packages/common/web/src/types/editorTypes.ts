import { UpdateEntityFunc, ImageComponentData } from './index';

export interface Helpers {
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
