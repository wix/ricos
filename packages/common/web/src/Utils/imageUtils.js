import imageClientAPI from 'image-client-api';
const PRELOAD_TYPE = 'preload';
const WIX_STATIC_URL = 'https://static.wixstatic.com';
const DEFAULT = {
  SIZE: 300,
  QUALITY: 5,
  TYPE: PRELOAD_TYPE,
};

const resize = (w, h, rw, rh) => {
  if (rw > w && rh > h) {
    return { width: w, height: h };
  }
  return { width: rw, height: rh };
};

const createPreloadUrl = ({ fileName, w, h }, rw, rh, rq) => {
  const { width, height } = resize(w, h, rw, rh);
  const H = Math.ceil(height); //make sure no sterching will occur
  const W = Math.ceil(width);
  const format = getImageFormat(fileName);
  return `${WIX_STATIC_URL}/media/${fileName}/v1/fit/w_${W},h_${H},al_c,q_${rq}/file${format}`;
};

const createHiResUrl = ({ fileName, w, h }, rw, rh, rq) => {
  return imageClientAPI.getScaleToFitImageURL(fileName, w, h, rw, rh, { quality: rq });
};

const getImageFormat = fileName => {
  const matches = /\.([0-9a-z]+)(?=[?#])|(\.)(?:[\w]+)$/i.exec(fileName);
  return matches ? matches[0] : '.jpg';
};

const getImageSrc = (src, helpers, options = {}) => {
  if (typeof src !== 'object') {
    return src;
  }

  const { source, url, file_name: fileName, width, height } = src || {};
  if (source) {
    if (source === 'static') {
      if (url) {
        return url;
      } else {
        console.error('must provide src url when using static image source!', src); //eslint-disable-line no-console
      }
    } else if (source === 'custom') {
      if (helpers && helpers.getImageUrl) {
        return helpers.getImageUrl({ file_name: fileName }); //eslint-disable-line camelcase
      } else {
        console.error('must provide getImageUrl helper when using custom image source!', src); //eslint-disable-line no-console
      }
    }
  } else if (fileName) {
    const {
      imageType = DEFAULT.TYPE,
      requiredWidth = DEFAULT.SIZE,
      requiredHeight = DEFAULT.SIZE,
      requiredQuality = DEFAULT.QUALITY,
    } = options;

    const createUrlFn = imageType === PRELOAD_TYPE ? createPreloadUrl : createHiResUrl;
    return createUrlFn(
      { fileName, w: width, h: height },
      requiredWidth,
      requiredHeight,
      requiredQuality
    );
  }
};

export { getImageSrc, DEFAULT as WIX_MEDIA_DEFAULT };
