/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  IMAGE_TYPE,
  GALLERY_TYPE,
  VIDEO_TYPE,
  FILE_UPLOAD_TYPE,
  Pubsub,
  MediaUploadError,
  VideoComponentData,
  ImageComponentData,
} from 'wix-rich-content-common';
import {
  fileExtensionToType,
  FileTypes,
} from 'wix-rich-content-plugin-file-upload/libs/fileExtensionToType';

const galleryItemBuilder = {
  [FileTypes.IMAGE]: (img, itemId: string, preloadImage?: boolean | undefined) => {
    return {
      metadata: {
        type: 'image',
        height: img.height,
        width: img.width,
      },
      itemId,
      url: preloadImage ? img.src : img.file_name,
      tempData: true,
    };
  },
  [FileTypes.VIDEO]: (video: VideoComponentData, itemId: string) => {
    return {
      metadata: {
        type: 'video',
        height: video.thumbnail.height,
        width: video.thumbnail.width,
        poster: video.thumbnail.pathname,
      },
      itemId,
      url: video.pathname,
      tempData: true,
    };
  },
};

const dataBuilder = {
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
  [GALLERY_TYPE]: ({ data, error }, componentData, fileType) => {
    const type =
      fileType ||
      fileExtensionToType(data.file_name?.split('.').pop() || data.pathname?.split('.').pop());
    return { ...galleryItemBuilder[type]?.(data, data.id || Date.now().toString()), error };
  },
};

const tempDataBuilder = {
  [IMAGE_TYPE]: ({ url }) => {
    return { dataUrl: url };
  },
  [VIDEO_TYPE]: ({ url }) => {
    return { src: url, tempData: true };
  },
  [FILE_UPLOAD_TYPE]: ({ file, type }) => {
    const { name, size } = file;
    return { name, size, type, tempData: true };
  },
  [GALLERY_TYPE]: ({ url: src, file: { height, width } }, fileType) => {
    if (fileType === FileTypes.IMAGE) {
      return galleryItemBuilder[FileTypes.IMAGE](
        { src, height, width },
        Date.now().toString(),
        true
      );
    }
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
  componentData?: Record<string, unknown>,
  itemIndex?: number,
  itemType?: string
) => {
  if (error) {
    commonPubsub.set('onMediaUploadError', error);
  }
  return onUploadFinished({
    data: data && dataBuilder[pluginType]?.({ data, error }, componentData, itemIndex, itemType),
    error,
    itemIndex,
  });
};

interface uploadData {
  data;
  error: MediaUploadError;
  itemIndex?: number;
}

interface TempData {
  url: string;
  name: string;
  size: number;
  type: string | undefined;
}

export const uploadFile = (
  files: File[],
  onLocalLoad: (tempData: TempData, itemPos?: number) => number | undefined,
  onUploadFinished: (data: uploadData) => void,
  handleFileUpload: (file: File, updateEntity: ({ data, error }) => void) => void,
  BI,
  pluginType: string,
  componentData,
  commonPubsub: Pubsub,
  itemPos?: number
) => {
  const file = files[0];
  if (file) {
    fileReader(file).then((url: string) => {
      const extension = file.name.split('.').pop();
      const fileType = extension && FileTypes[fileExtensionToType(extension)];
      const tempData = tempDataBuilder[pluginType]?.(
        {
          url,
          file,
          type: extension,
        },
        fileType
      );
      const itemIndex = onLocalLoad?.(tempData, itemPos);
      if (handleFileUpload) {
        const uploadBIData = BI?.onMediaUploadStart(pluginType, file.size, fileType);
        handleFileUpload(file, ({ data, error }) => {
          BI?.onMediaUploadEnd(uploadBIData, error);
          handleUploadFinished(
            data,
            error,
            onUploadFinished,
            commonPubsub,
            pluginType,
            componentData,
            itemIndex,
            fileType
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
