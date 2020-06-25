interface MediaUploadError {
  msg: string;
  toastMsg?: string;
}

type UpdateEntityFunc<T> = ({
  data,
  error,
  index,
}: {
  data?: T;
  error?: MediaUploadError;
  index?: number;
}) => void;

interface ImageComponentData {
  id: string;
  height: number;
  width: number;
  original_file_name: string;
  file_name: string;
}

interface VideoComponentData {
  pathname: string;
  thumbnail: {
    pathname: string;
    height: number;
    width: number;
  };
}

interface FileComponentData {
  name: string;
  type: string;
}
