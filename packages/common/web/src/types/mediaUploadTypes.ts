export enum MediaUploadErrorKey {
  GENERIC,
  SIZE_LIMIT,
  QUOTA_STORAGE_VISITOR,
  QUOTA_STORAGE_OWNER,
  QUOTA_VIDEO_VISITOR,
  QUOTA_VIDEO_OWNER,
}

export interface MediaUploadError {
  msg?: string | JSX.Element;
  key?: MediaUploadErrorKey;
  args?: Record<string, string | number>;
}

export type UpdateEntityFunc<T> = ({
  data,
  error,
  index,
}: {
  data?: T;
  error?: MediaUploadError;
  index?: number;
}) => void;

export interface ImageComponentData {
  id: string;
  height: number;
  width: number;
  original_file_name: string;
  file_name: string;
}

export interface VideoComponentData {
  pathname: string;
  thumbnail: {
    pathname: string;
    height: number;
    width: number;
  };
}

export interface FileComponentData {
  name: string;
  type: string;
}
