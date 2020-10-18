import { BUTTONS } from 'wix-rich-content-plugin-commons';
import { getModalStyles, decorateComponentWithProps } from 'wix-rich-content-editor-common';
import { ReplaceIcon } from '../icons';
import getModalCustomStyles from './ModalCustomStyles';
import VerticalEmbedInputModal from './VerticalEmbedInputModal';
import { CreateInlineButtons } from 'wix-rich-content-common';

const createInlineButtons: CreateInlineButtons<'t' | 'isMobile' | 'settings' | 'locale'> = ({
  t,
  isMobile,
  settings,
  locale,
}) => {
  return [
    {
      keyName: 'replace',
      type: BUTTONS.EXTERNAL_MODAL,
      icon: ReplaceIcon,
      modalElement: decorateComponentWithProps(VerticalEmbedInputModal, { ...settings, locale }),
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
