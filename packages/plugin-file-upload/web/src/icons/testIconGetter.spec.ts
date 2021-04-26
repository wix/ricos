import { getIcon } from './getIcon';
import xlsIcon from './xlsIcon';
import vidAudIcon from './vid-aud-icon';
import pptIcon from './pptIcon';
import pdfIcon from './pdfIcon';
import otherIcon from './otherIcon';
import imageIcon from './imageIcon';
import folderIcon from './folderIcon';
import docIcon from './docIcon';

const doc = ['doc', 'docx'];
const excel = ['xl', 'xls', 'xlsx', 'xlsb', 'xlsm'];
const ppt = ['ppt', 'pptx'];
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
const vidAud = [
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
  'mp3',
  'pcm',
  'wav',
  'aiff',
  'aif',
  'aac',
  'ogg',
  'wma',
  'm4a',
  'flac',
];
const pdf = ['pdf'];
const folder = ['zip', 'rar'];
const other = ['py', 'c', 'java', 'cpp', 'txt'];

const iconPool = [
  { extensions: excel, icon: xlsIcon },
  { extensions: vidAud, icon: vidAudIcon },
  { extensions: ppt, icon: pptIcon },
  { extensions: pdf, icon: pdfIcon },
  { extensions: images, icon: imageIcon },
  { extensions: folder, icon: folderIcon },
  { extensions: doc, icon: docIcon },
  { extensions: other, icon: otherIcon },
];

describe('file-upload tests', () => {
  it('should get the correct icon', () => {
    iconPool.forEach(({ extensions, icon }) => {
      const extension = extensions[Math.floor(Math.random() * extensions.length)];
      expect(getIcon(extension)).toEqual(icon);
    });
  });
});
