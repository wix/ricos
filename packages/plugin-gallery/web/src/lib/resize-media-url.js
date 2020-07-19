/* eslint-disable no-param-reassign, camelcase */

import imageClientAPI from 'image-client-api';

const WIX_MEDIA_BASE_URL = 'https://static.wixstatic.com/media/';
const WIX_VIDEO_BASE_URL = 'https://video.wixstatic.com/';

const getWixFilename = url => url.replace(WIX_MEDIA_BASE_URL, '');

const getImageAbsoluteUrl = imageUrl =>
  !isAbsoluteUrl(imageUrl) && !imageUrl.startsWith(WIX_MEDIA_BASE_URL)
    ? WIX_MEDIA_BASE_URL + imageUrl
    : imageUrl;

const getVideoAbsoluteUrl = videoUrl =>
  !isAbsoluteUrl(videoUrl) && !videoUrl.startsWith(WIX_VIDEO_BASE_URL)
    ? WIX_VIDEO_BASE_URL + videoUrl
    : videoUrl;

const isAbsoluteUrl = url => url.startsWith('http://') || url.startsWith('https://');

const getResizedImageUrl = (
  item,
  originalUrl,
  resizeMethod,
  requiredWidth,
  requiredHeight,
  sharpParams,
  faces,
  allowWatermark,
  focalPoint
) => {
  // assign default parameters
  originalUrl = originalUrl || '';
  sharpParams = sharpParams || {};

  // calc default quality
  if (sharpParams.quality > 0) {
    //don't allow quality above 90 till we have proper UI indication
    sharpParams.quality = Math.min(90, sharpParams.quality);
  }

  const focalPointObj = { x: 50, y: 50 };
  if (focalPoint && focalPoint[0] >= 0 && focalPoint[1] >= 0) {
    focalPointObj.x = Math.round(focalPoint[0] * 100);
    focalPointObj.y = Math.round(focalPoint[1] * 100);
  }

  if (sharpParams.allowUsm === true && sharpParams.usm) {
    sharpParams.usm.usm_a = Math.min(5, Math.max(0, sharpParams.usm.usm_a || 0));
    sharpParams.usm.usm_r = Math.min(128, Math.max(0, sharpParams.usm.usm_r || 0)); //should be max 500 - but it's returning a 404
    sharpParams.usm.usm_t = Math.min(1, Math.max(0, sharpParams.usm.usm_t || 0));
  } else {
    sharpParams.usm = {
      usm_a: 0,
      usm_r: 0,
      usm_t: 0,
    };
  }

  let resizer = () => {};
  if (resizeMethod === 'fit') {
    resizer = imageClientAPI.getScaleToFitImageURL;
  } else {
    resizer = imageClientAPI.getScaleToFillImageURL;
  }

  /**
   * the transform options
   * @typedef  {object}   ImageTransformOptions
   * @property {boolean}  [progressive]               image transform progressive
   * @property {number}   [quality]                   image transform quality
   * @property {string}   [watermark]                 image watermark id
   * @property {object}   [unsharpMask]               unsharpMask filter
   * @property {number}   [unsharpMask.radius]        unsharpMask radius
   * @property {number}   [unsharpMask.amount]        unsharpMask amount
   * @property {number}   [unsharpMask.threshold]     unsharpMask threshold
   */

  const options = {};
  if (sharpParams.quality > 0) {
    options.quality = sharpParams.quality;
  }
  if (sharpParams.blur > 0) {
    options.filters = {
      blur: sharpParams.blur,
    };
  }
  if (focalPointObj) {
    options.focalPoint = focalPointObj;
  }
  if (sharpParams && sharpParams.usm) {
    options.unsharpMask = {
      radius: parseFloat(sharpParams.usm.usm_r),
      amount: parseFloat(sharpParams.usm.usm_a),
      threshold: parseFloat(sharpParams.usm.usm_t),
    };
  }

  const retUrl = !isAbsoluteUrl(originalUrl)
    ? resizer(
        getWixFilename(originalUrl),
        item.maxWidth,
        item.maxHeight,
        requiredWidth,
        requiredHeight,
        options
      )
    : originalUrl;
  return retUrl;
};

const resizeMediaUrl = (
  item,
  originalUrl,
  resizeMethod,
  requiredWidth,
  requiredHeight,
  sharpParams,
  faces = false,
  allowWatermark = false,
  focalPoint
) => {
  if (originalUrl.indexOf('base64') !== -1) {
    return originalUrl;
  }
  /* eslint-disable no-param-reassign */
  requiredWidth = Math.ceil(requiredWidth);
  requiredHeight = Math.ceil(requiredHeight);
  /* eslint-enable no-param-reassign */

  if (resizeMethod === 'video') {
    return getVideoAbsoluteUrl(originalUrl);
  } else if (requiredWidth >= item.maxWidth && requiredHeight >= item.maxHeight) {
    return getImageAbsoluteUrl(item.url);
  } else {
    return getResizedImageUrl(
      item,
      originalUrl,
      resizeMethod,
      requiredWidth,
      requiredHeight,
      sharpParams,
      faces,
      allowWatermark,
      focalPoint
    );
  }
};

export default resizeMediaUrl;
