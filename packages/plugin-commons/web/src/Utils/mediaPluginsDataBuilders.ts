import {
  IMAGE_TYPE,
  GALLERY_TYPE,
  VIDEO_TYPE,
  FILE_UPLOAD_TYPE,
  VideoComponentData,
} from 'wix-rich-content-common';
import { fileExtensionToType, FileTypes } from '../Utils/fileExtensionToType';

const galleryItemBuilder = {
  [FileTypes.IMAGE]: (img, itemId: string, preloadImage?: boolean) => {
    return {
      metadata: {
        type: 'image',
        height: img.height,
        width: img.width,
      },
      itemId,
      url: preloadImage ? img.src : img.file_name,
      tempData: preloadImage,
    };
  },
  [FileTypes.VIDEO]: (video: VideoComponentData, itemId: string, preloadImage?: boolean) => {
    return {
      metadata: {
        type: 'video',
        height: video.thumbnail.height,
        width: video.thumbnail.width,
        poster: video.thumbnail.pathname,
      },
      itemId,
      url: video.pathname,
      tempData: preloadImage,
    };
  },
};

const setItemInGallery = (item, componentData, itemPos?: number) => {
  let { items, styles } = componentData;
  if (typeof itemPos === 'undefined') {
    items = [...items, item];
  } else {
    items = [...items];
    items[itemPos] = item;
  }
  return { items, styles, config: {} };
};

export const dataBuilder = {
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
  [GALLERY_TYPE]: ({ data, error }, componentData, fileType, itemIndex) => {
    const type =
      FileTypes[fileType] ||
      fileExtensionToType(data.file_name?.split('.').pop() || data.pathname?.split('.').pop());
    return setItemInGallery(
      { ...galleryItemBuilder[type]?.(data, data.id || Date.now().toString()), error },
      componentData,
      itemIndex
    );
  },
};

export const tempDataBuilder = {
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
};

export const uploadFunctionGetter = {
  [IMAGE_TYPE]: props => props.helpers?.handleFileUpload,
  [VIDEO_TYPE]: props => props.handleFileUpload,
  [FILE_UPLOAD_TYPE]: props => props.settings?.onFileSelected,
  [GALLERY_TYPE]: props => props.helpers?.handleFileUpload,
};
