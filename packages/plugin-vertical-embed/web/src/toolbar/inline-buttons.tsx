import { BUTTONS } from 'wix-rich-content-plugin-commons';
import { getModalStyles, decorateComponentWithProps } from 'wix-rich-content-editor-common';
import { ReplaceIcon } from '../icons';
import getModalCustomStyles from './ModalCustomStyles';
import PostSelectionInputModal from './postSelectionInputModal';
import { CreateInlineButtons } from 'wix-rich-content-common';

const createInlineButtons: CreateInlineButtons<'t' | 'isMobile' | 'settings'> = ({
  t,
  isMobile,
  settings,
}) => {
  return [
    {
      keyName: 'replace',
      type: BUTTONS.EXTERNAL_MODAL,
      icon: ReplaceIcon,
      modalElement: decorateComponentWithProps(PostSelectionInputModal, settings),
      modalStyles: getModalStyles({
        fullScreen: false,
        isMobile,
        customStyles: getModalCustomStyles(isMobile),
      }),
      mobile: true,
      tooltipTextKey: 'Replace product',
      t,
    },
    { keyName: 'delete', type: BUTTONS.DELETE, mobile: true },
  ];
};

export default createInlineButtons;
