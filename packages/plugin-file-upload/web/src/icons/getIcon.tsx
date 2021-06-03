import xlsIcon from './xlsIcon';
import vidAudIcon from './vid-aud-icon';
import pptIcon from './pptIcon';
import pdfIcon from './pdfIcon';
import otherIcon from './otherIcon';
import imageIcon from './imageIcon';
import folderIcon from './folderIcon';
import docIcon from './docIcon';
import { fileExtensionToType, FileTypes } from 'wix-rich-content-plugin-commons';

const iconMap = {
  [FileTypes.IMAGE]: imageIcon,
  [FileTypes.VIDEO]: vidAudIcon,
  [FileTypes.AUDIO]: vidAudIcon,
  [FileTypes.PDF]: pdfIcon,
  [FileTypes.ARCHIVE]: folderIcon,
  [FileTypes.WORD]: docIcon,
  [FileTypes.EXCEL]: xlsIcon,
  [FileTypes.POWERPOINT]: pptIcon,
  [FileTypes.MISC]: otherIcon,
};

export const getIcon = (extension: string) => {
  return iconMap[fileExtensionToType(extension)];
};
