const WIX_MEDIA_BASE_URL = 'https://static.wixstatic.com/';
const WIX_VIDEO_BASE_URL = 'https://video.wixstatic.com/';

export const getWixFilename = (url: string) => url.replace(WIX_MEDIA_BASE_URL, '');

export const isAbsoluteUrl = (url: string) =>
  url.startsWith('http://') || url.startsWith('https://');

export const getAbsoluteUrl = (url: string, type: 'image' | 'video') => {
  if (isAbsoluteUrl(url)) {
    return url;
  }

  let baseUrl: string, baseFolder: string;
  if (type === 'image') {
    baseUrl = WIX_MEDIA_BASE_URL;
    baseFolder = 'media/';
  } else {
    //video
    baseUrl = WIX_VIDEO_BASE_URL;
    baseFolder = 'video/';
  }

  const pathWithFolder = url.startsWith(baseFolder) ? url : baseFolder + url;
  return baseUrl + pathWithFolder;
};
