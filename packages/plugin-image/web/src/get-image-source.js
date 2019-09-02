import wixMediaUrl from './get-wix-media-url';

const getImageSrc = (src, helpers, options = {}) => {
  if (typeof src === 'object') {
    if (src.source) {
      if (src.source === 'static') {
        if (src.url) {
          return src.url;
        } else {
          console.error('must provide src url when using static image source!', src); //eslint-disable-line no-console
        }
      } else if (src.source === 'custom') {
        if (helpers && helpers.getImageUrl) {
          return helpers.getImageUrl({ file_name: src.file_name }); //eslint-disable-line camelcase
        } else {
          console.error('must provide getImageUrl helper when using custom image source!', src); //eslint-disable-line no-console
        }
      }
    } else if (src.file_name) {
      const url = wixMediaUrl.createUrl(
        src,
        options.requiredWidth,
        options.requiredHeight,
        options.requiredQuality,
        options.imageType
      );
      return url;
    }
  }

  return src;
};

export default getImageSrc;
