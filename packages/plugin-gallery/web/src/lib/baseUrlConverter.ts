const WIX_MEDIA_BASE_URL = 'https://static.wixstatic.com/';
const WIX_VIDEO_BASE_URL = 'https://video.wixstatic.com/';

export const getWixFilename = (url: string) => url.replace(WIX_MEDIA_BASE_URL, '');

export const isAbsoluteUrl = (url: string) =>
  url.startsWith('http://') || url.startsWith('https://');

export const getAbsoluteUrl = (url: string, type: 'image' | 'video') => {
  const baseUrl = type === 'image' ? WIX_MEDIA_BASE_URL : WIX_VIDEO_BASE_URL;
  const prefix = type === 'image' ? 'media/' : 'video/';
  if (!isAbsoluteUrl(url) && !url.startsWith(baseUrl)) {
    const postfix = url.startsWith(prefix) ? url : prefix + url;
    return baseUrl + postfix;
  }
  return url;
};
