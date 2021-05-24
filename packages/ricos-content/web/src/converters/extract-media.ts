import { DraftContent } from '../types/contentTypes';
import { getImageSrc } from '../imageUtils';
import extractEntityData from '../preview/ContentStateAnalyzer/extractEntityData';

const toSeoImage = entityData => {
  const {
    url,
    width,
    height,
    metadata: { alt, caption },
  } = entityData;
  const imageUrl = getImageSrc({ file_name: url }, undefined, {
    imageType: 'highRes',
    requiredQuality: 90,
    requiredHeight: height as number,
    requiredWidth: width as number,
  });
  return { imageUrl, imageWidth: width, imageHeight: height, imageAlt: alt, imageCaption: caption };
};

const toSeoVideo = entityData => {
  const { url, thumbnail } = entityData;
  return { videoThumbnailUrl: thumbnail, videoContentUrl: url };
};

export const extractMedia = ({ entityMap }: DraftContent) =>
  Object.values(entityMap)
    .filter(entity =>
      [
        'wix-draft-plugin-image',
        'wix-draft-plugin-giphy',
        'wix-draft-plugin-gallery',
        'wix-draft-plugin-video',
      ].includes(entity.type)
    )
    .reduce((media, entity) => [...media, ...extractEntityData(entity)], [])
    .map(entityData => ({ image: toSeoImage, video: toSeoVideo }[entityData.type](entityData)));
