import { BUTTONS } from 'wix-rich-content-plugin-commons';
import { getModalStyles } from 'wix-rich-content-editor-common';
import { Modals } from '../modals';
import { CreateInlineButtons, TranslationFunction } from 'wix-rich-content-common';

const modalStyles = {
  customStyles: {
    overlay: {
      backgroundColor: 'transparent',
    },
    content: {
      borderRadius: '2px',
      boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.1)',
      border: 'solid 1px rgba(255, 255, 255, 0.25)',
    },
  },
};

const createInlineButtons: CreateInlineButtons = ({ t }: { t: TranslationFunction }) => {
  return [
    {
      keyName: 'settings',
      type: BUTTONS.EXTERNAL_MODAL,
      modalName: Modals.ACCORDION_MODAL,
      children: t('Accordion_AccordionSettings_Tab_Settings_TabName'),
      modalStyles: getModalStyles(modalStyles),
      t,
      mobile: true,
    },
    { keyName: 'separator', mobile: false, type: BUTTONS.SEPARATOR },
    { keyName: 'delete', type: BUTTONS.DELETE, mobile: true },
  ];
};

export default createInlineButtons;
