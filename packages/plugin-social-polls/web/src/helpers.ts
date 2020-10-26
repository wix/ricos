import imageClientAPI from 'image-client-api';

import { BACKGROUND_TYPE } from './defaults';

export function generateId() {
  return Math.random()
    .toString(36)
    .substr(2, 9);
}

export function getRandomValue<T>(pool: T[]) {
  return pool[Math.floor(Math.random() * pool.length)];
}

export function getBackgroundString(
  background: string,
  backgroundType: BACKGROUND_TYPE,
  width: number,
  height: number
) {
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

export function getMediaId(src: string) {
  try {
    const [, mediaId] = /media\/([^/]+)/.exec(src) as string[];
    return mediaId;
  } catch (error) {
    return src;
  }
}

export function getImageSrc(src: string, width: number, height: number) {
  const mediaId = getMediaId(src);

  try {
    return imageClientAPI.getScaleToFillImageURL(mediaId, null, null, width, height, {
      quality: 90,
    });
  } catch (error) {
    return src;
  }
}
