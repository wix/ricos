export enum FileTypes {
  IMAGE = 1,
  VIDEO,
  WORD,
  EXCEL,
  ARCHIVE,
  PDF,
  POWERPOINT,
  AUDIO,
  MISC,
}

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
const folder = ['zip', 'rar', 'tar', 'gz', 'gzip', 'jar', '7z', 'fgz', 'webarchive'];

const extRegList = [
  { data: doc, fileType: FileTypes.WORD },
  { data: excel, fileType: FileTypes.EXCEL },
  { data: ppt, fileType: FileTypes.POWERPOINT },
];
const extList = [
  { data: images, fileType: FileTypes.IMAGE },
  { data: videos, fileType: FileTypes.VIDEO },
  { data: audios, fileType: FileTypes.AUDIO },
  { data: pdf, fileType: FileTypes.PDF },
  { data: folder, fileType: FileTypes.ARCHIVE },
];

function getFileTypeFromList(
  extension: string,
  checkList: { data: string[] | RegExp; fileType: FileTypes }[],
  extensionPredicate: (testSet: RegExp | string[], extension: string) => boolean
) {
  let retVal;
  checkList.some(({ data, fileType }) => {
    if (extensionPredicate(data, extension)) {
      retVal = fileType;
      return true;
    }
    return false;
  });
  return retVal;
}

export const mapExtensionToType = (extension: string): FileTypes => {
  const fileType =
    extension &&
    (getFileTypeFromList(
      extension,
      extRegList as { data: RegExp; fileType: FileTypes }[],
      (regExp: RegExp, extension) => regExp.test(extension)
    ) ||
      getFileTypeFromList(
        extension,
        extList as { data: string[]; fileType: FileTypes }[],
        (typeList: string[], extension) => typeList.includes(extension)
      ));
  return fileType || FileTypes.MISC;
};
