export { normalizeInitialState } from './normalization';
export {
  isValidExactUrl,
  isValidUrl,
  normalizeUrl,
  getUrlMatches,
  startsWithHttps,
  hasProtocol,
} from './urlValidators/urlValidators';

export * from './consts';
export * from './types';
export * from './version';
export {
  migrateDividerData,
  migrateImageData,
  migrateGalleryData,
  migratePollData,
  migrateVerticalEmbedData,
  migrateHtmlData,
  migrateGiphyData,
  migrateVideoData,
  migrateLinkPreviewData,
  migrateSoundCloudData,
} from './migrateSchema/toDraft/getDraftEntityData';

export { isContentStateEmpty } from './contentStateUtils/contentStateUtils';

export { createContent } from './contentStateUtils/createContent';
