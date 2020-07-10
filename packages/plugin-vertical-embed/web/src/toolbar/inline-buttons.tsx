import {
  BUTTONS,
  getModalStyles,
  decorateComponentWithProps,
} from 'wix-rich-content-editor-common';
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
    { keyName: 'alignLeft', type: BUTTONS.SIZE_SMALL_LEFT, mobile: false },
    { keyName: 'alignCenter', type: BUTTONS.SIZE_CONTENT_CENTER, mobile: false },
    { keyName: 'alignRight', type: BUTTONS.SIZE_SMALL_RIGHT, mobile: false },
    { keyName: 'separator1', type: BUTTONS.SEPARATOR, mobile: false },
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
