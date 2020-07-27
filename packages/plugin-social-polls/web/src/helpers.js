import imageClientAPI from 'image-client-api';

import { BACKGROUND_TYPE } from './constants';

export function generateId() {
  return Math.random()
    .toString(36)
    .substr(2, 9);
}

export function getRandomValue(pool) {
  return pool[Math.floor(Math.random() * pool.length)];
}

export function getBackgroundString(background, backgroundType, width, height) {
  switch (backgroundType) {
    case BACKGROUND_TYPE.GRADIENT:
      try {
        const gradient = typeof background === 'string' ? JSON.parse(background) : background;
        return `linear-gradient(${gradient.angle}deg, ${gradient.start}, ${gradient.end})`;
      } catch (error) {
        return background;
      }

    case BACKGROUND_TYPE.IMAGE:
      if (!width || !height) {
        return null;
      }
      // eslint-disable-next-line no-case-declarations
      const imageSrc = getImageSrc(background, width, height);
      return `url('${imageSrc}') center / cover`;

    case BACKGROUND_TYPE.COLOR:
    default:
      return background;
  }
}

export function getMediaId(src) {
  try {
    const [, mediaId] = /media\/([^/]+)/.exec(src);
    return mediaId;
  } catch (error) {
    return src;
  }
}

export function getImageSrc(src, width, height) {
  const mediaId = getMediaId(src);

  try {
    return imageClientAPI.getScaleToFillImageURL(mediaId, null, null, width, height, {
      quality: 90,
    });
  } catch (error) {
    return src;
  }
}
