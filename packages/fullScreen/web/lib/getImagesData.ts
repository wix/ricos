import { RicosEntityMap, RicosEntity } from 'wix-rich-content-common';
import { IMAGE_TYPE, IMAGE_TYPE_LEGACY, GALLERY_TYPE } from 'ricos-content';

function imageEntryToGallery(data, index: number) {
  const { src, metadata } = data;
  const { file_name, height, width, id } = src;

  const { caption = '', alt = '' } = metadata;
  return {
    metadata: {
      height,
      width,
      title: caption,
      altText: alt,
    },
    itemId: id || file_name + index,
    url: file_name,
  };
}

function convertEntryToGalleryItems(entry: RicosEntity, index: number) {
  switch (entry.type) {
    case IMAGE_TYPE:
    case IMAGE_TYPE_LEGACY:
      return entry.data.src ? [imageEntryToGallery(entry.data, index)] : [];
    case GALLERY_TYPE:
      return entry.data.items;
    default:
      return [];
  }
}

export type RicosImagesExpandModeData = { images: string[]; imageMap: Record<number, number> };
export default function getImagesData({
  entityMap,
}: {
  entityMap: RicosEntityMap;
}): RicosImagesExpandModeData {
  let sum = 0;
  const imageMap: Record<number, number> = {};
  const images = Object.values(entityMap)
    .map(convertEntryToGalleryItems)
    .reduce((urls, entryUrls, i) => {
      if (entryUrls.length > 0) {
        imageMap[i] = sum;
      }
      sum += entryUrls.length;
      return urls.concat(entryUrls);
    }, []);
  return { images, imageMap };
}
