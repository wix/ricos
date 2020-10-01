const doc = new RegExp('^doc([a-z]*)$');
const excel = new RegExp('^xl([a-z]*)$');
const ppt = new RegExp('^ppt([a-z]*)$');
const images = [
  'jpg',
  'png',
  'gif',
  'jpeg',
  'jpe',
  'jfif',
  'bmp',
  'heic',
  'heif',
  'tfif',
  'tif',
  'webp',
];
const videos = [
  'avi',
  'mpeg',
  'mpg',
  'mpe',
  'mp4',
  'mkv',
  'webm',
  'mov',
  'ogv',
  'vob',
  'm4v',
  '3gp',
  'divx',
  'xvid',
  'mxf',
  'wmv',
  'm1v',
  'flv',
];
const audios = ['mp3', 'pcm', 'wav', 'aiff', 'aif', 'aac', 'ogg', 'wma', 'm4a', 'flac'];
const pdf = ['pdf'];
const folder = ['zip', 'rar'];

const extRegList = [
  { data: doc, mediaType: 'ms-word' },
  { data: excel, mediaType: 'ms-excel' },
  { data: ppt, mediaType: 'ms-powerpoint' },
];
const extList = [
  { data: images, mediaType: 'image' },
  { data: videos, mediaType: 'video' },
  { data: audios, mediaType: 'audio' },
  { data: pdf, mediaType: 'pdf' },
  { data: folder, mediaType: 'compressed-file' },
];

function getMediaTypeFromList(
  type: string,
  checkList: { data: string[] | RegExp; mediaType: string }[],
  typePredicate: (testSet: RegExp | string[], type: string) => boolean
) {
  let retVal;
  checkList.some(({ data, mediaType }) => {
    if (typePredicate(data, type)) {
      retVal = mediaType;
      return true;
    }
    return false;
  });
  return retVal;
}

export const getMediaType = (type: string) => {
  const mediaType =
    type &&
    (getMediaTypeFromList(
      type,
      extRegList as { data: RegExp; mediaType: string }[],
      (regExp: RegExp, type) => regExp.test(type)
    ) ||
      getMediaTypeFromList(
        type,
        extList as { data: string[]; mediaType: string }[],
        (typeList: string[], type) => typeList.some(e => e === type)
      ));
  return mediaType || 'other';
};
