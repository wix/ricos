import xlsIcon from './xlsIcon';
import vidAudIcon from './vid-aud-icon';
import pptIcon from './pptIcon';
import pdfIcon from './pdfIcon';
import otherIcon from './otherIcon';
import imageIcon from './imageIcon';
import folderIcon from './folderIcon';
import docIcon from './docIcon';
import { ComponentType } from 'react';

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

const iconRegList = [
  { data: doc, icon: docIcon },
  { data: excel, icon: xlsIcon },
  { data: ppt, icon: pptIcon },
];
const iconList = [
  { data: images, icon: imageIcon },
  { data: videos, icon: vidAudIcon },
  { data: audios, icon: vidAudIcon },
  { data: pdf, icon: pdfIcon },
  { data: folder, icon: folderIcon },
];

function getIconFromList(
  type: string,
  checkList: { data: string[] | RegExp; icon: ComponentType }[],
  typePredicate: (testSet: RegExp | string[], type: string) => boolean
) {
  let retVal;
  checkList.some(({ data, icon }) => {
    if (typePredicate(data, type)) {
      retVal = icon;
      return true;
    }
    return false;
  });
  return retVal;
}

export const getIcon = (type: string) => {
  const icon =
    type &&
    (getIconFromList(
      type,
      iconRegList as { data: RegExp; icon: ComponentType }[],
      (regExp: RegExp, type) => regExp.test(type)
    ) ||
      getIconFromList(
        type,
        iconList as { data: string[]; icon: ComponentType }[],
        (typeList: string[], type) => typeList.some(e => e === type)
      ));
  return icon || otherIcon;
};
