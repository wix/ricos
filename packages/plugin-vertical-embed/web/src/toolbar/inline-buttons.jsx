import { BUTTONS, getModalStyles } from 'wix-rich-content-editor-common';
import { ReplaceIcon } from '../icons';
import { Modals } from '../modals';
import getModalCustomStyles from './ModalCustomStyles';

export default ({ t, isMobile }) => {
  return [
    { keyName: 'alignLeft', type: BUTTONS.SIZE_SMALL_LEFT, mobile: false },
    { keyName: 'alignCenter', type: BUTTONS.SIZE_CONTENT_CENTER, mobile: false },
    { keyName: 'alignRight', type: BUTTONS.SIZE_SMALL_RIGHT, mobile: false },
    { keyName: 'separator1', type: BUTTONS.SEPARATOR, mobile: true },
    {
      keyName: 'replace',
      type: BUTTONS.EXTERNAL_MODAL,
      icon: ReplaceIcon,
      modalName: Modals.POST_SELECTION_INPUT,
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
