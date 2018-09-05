import { DEFAULTS } from '../giphy-component';
import { getModalStyles, TOOLBARS } from 'wix-rich-content-common';
import GiphyApiInputModal from './giphyApiInputModal';
import { InsertPluginIcon } from '../icons';

const modalCustomStyle = {
  content:
  {
  }
};

export default ({ helpers, t }) => {
  return [
    {
      type: 'modal',
      name: 'giphy',
      tooltipText: t('GiphyPlugin_InsertButton_Tooltip'),
      Icon: InsertPluginIcon,
      componentData: DEFAULTS,
      toolbars: [TOOLBARS.FOOTER, TOOLBARS.SIDE],
      modalElement: GiphyApiInputModal,
      modalStyles: getModalStyles({ customStyles: modalCustomStyle, fullScreen: false }),
      helpers,
    },
  ];
};
