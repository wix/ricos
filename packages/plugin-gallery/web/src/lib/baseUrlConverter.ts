const WIX_MEDIA_BASE_URL = 'https://static.wixstatic.com/';
const WIX_VIDEO_BASE_URL = 'https://video.wixstatic.com/';

export const getWixFilename = (url: string) => url.replace(WIX_MEDIA_BASE_URL, '');

export const isAbsoluteUrl = (url: string) =>
  url.startsWith('http://') || url.startsWith('https://');

export const getAbsoluteUrl = (url: string, type: 'image' | 'video') => {
  const baseUrl = type === 'image' ? WIX_MEDIA_BASE_URL : WIX_VIDEO_BASE_URL;
  return !isAbsoluteUrl(url) && !url.startsWith(baseUrl) ? baseUrl + url : url;
};
