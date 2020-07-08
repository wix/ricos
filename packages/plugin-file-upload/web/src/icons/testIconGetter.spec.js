import { getIcon } from './getIcon';
import xlsIcon from './xls.svg';
import vidAudIcon from './vid-aud.svg';
import pptIcon from './ppt.svg';
import pdfIcon from './pdf.svg';
import otherIcon from './other.svg';
import imageIcon from './img.svg';
import folderIcon from './folder.svg';
import docIcon from './doc.svg';

const doc = ['doc', 'docx'];
const excel = ['xl', 'xls', 'xlsx', 'xlsb', 'xlsm'];
const ppt = ['ppt', 'pptx'];
const images = ['jpeg', 'jpg', 'png', 'svg'];
const vidAud = [
  'mp4',
  'h.264',
  'mpeg-4',
  'divx',
  'mpeg-2',
  'hevc',
  'mov',
  'wmv',
  'avi',
  'mp3',
  'pcm',
  'wav',
  'aiff',
  'aac',
  'ogg',
  'wma',
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
