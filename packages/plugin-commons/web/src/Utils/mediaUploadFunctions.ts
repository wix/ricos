/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  IMAGE_TYPE,
  GALLERY_TYPE,
  VIDEO_TYPE,
  FILE_UPLOAD_TYPE,
  Pubsub,
  MediaUploadError,
} from 'wix-rich-content-common';
import {
  fileExtensionToType,
  FileTypes,
} from 'wix-rich-content-plugin-file-upload/libs/fileExtensionToType';

const componentDataBuilder = {
  [IMAGE_TYPE]: ({ data, error }, componentData) => {
    const imageData = data?.length ? data[0] : data;
    const config = { ...componentData.config };
    if (!config.alignment) {
      config.alignment = imageData.width >= 740 ? 'center' : 'left';
    }
    return {
      ...componentData,
      config,
      src: imageData,
      error,
    };
  },
  [VIDEO_TYPE]: ({ data, error }, componentData) => {
    let { src } = componentData;
    if (data) {
      const { pathname, thumbnail, url } = data;
      src = pathname ? { pathname, thumbnail } : url;
    }
    return { ...componentData, src, error, tempData: !!error };
  },
  [FILE_UPLOAD_TYPE]: ({ data, error }, componentData) => {
    return { ...componentData, ...data, error, tempData: undefined };
  },
};

const fileReader = (file: File) => {
  return new Promise(resolve => {
    const fr = new FileReader();
    fr.onload = e => resolve(e.target?.result);
    fr.readAsDataURL(file);
  });
};

export const handleUploadFinished = (
  data: Record<string, unknown> | undefined,
  error: MediaUploadError,
  onUploadFinished: (data: uploadData) => void,
  commonPubsub: Pubsub,
  pluginType: string,
  componentData?: Record<string, unknown>
) => {
  if (error) {
    commonPubsub.set('onMediaUploadError', error);
  }
  return onUploadFinished({
    componentData: data && componentDataBuilder[pluginType]?.({ data, error }, componentData),
    error,
  });
};

interface uploadData {
  componentData;
  error: MediaUploadError;
}

interface TempData {
  url: string;
  name: string;
  size: number;
  type: string | undefined;
  tempData: boolean;
}

export const uploadFile = (
  files: File[],
  onLocalLoad: (tempData: TempData) => void,
  onUploadFinished: (data: uploadData) => void,
  handleFileUpload: (file: File, updateEntity: ({ data, error }) => void) => void,
  BI,
  pluginType: string,
  componentData,
  commonPubsub: Pubsub
) => {
  const file = files[0];
  if (file) {
    fileReader(file).then((url: string) => {
      const { name, size } = file;
      const fileExtension = name.split('.').pop();
      onLocalLoad?.({ url, name, size, type: fileExtension, tempData: true });
      if (handleFileUpload) {
        const uploadBIData = BI?.onMediaUploadStart(
          pluginType,
          file.size,
          fileExtension && FileTypes[fileExtensionToType(fileExtension)]
        );
        handleFileUpload(file, ({ data, error }) => {
          BI?.onMediaUploadEnd(uploadBIData, error);
          handleUploadFinished(
            data,
            error,
            onUploadFinished,
            commonPubsub,
            pluginType,
            componentData
          );
        });
      } else {
        handleUploadFinished(
          undefined,
          { msg: 'Missing upload function' },
          onUploadFinished,
          commonPubsub,
          pluginType
        );
      }
    });
  }
};
