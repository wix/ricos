const WIX_MEDIA_BASE_URL = 'https://static.wixstatic.com/';
const WIX_VIDEO_BASE_URL = 'https://video.wixstatic.com/';

export const getWixFilename = url => url.replace(WIX_MEDIA_BASE_URL, '');

export const isAbsoluteUrl = url => url.startsWith('http://') || url.startsWith('https://');

export const getImageAbsoluteUrl = imageUrl =>
  !isAbsoluteUrl(imageUrl) && !imageUrl.startsWith(WIX_MEDIA_BASE_URL)
    ? WIX_MEDIA_BASE_URL + imageUrl
    : imageUrl;

export const getVideoAbsoluteUrl = videoUrl =>
  !isAbsoluteUrl(videoUrl) && !videoUrl.startsWith(WIX_VIDEO_BASE_URL)
    ? WIX_VIDEO_BASE_URL + videoUrl
    : videoUrl;
