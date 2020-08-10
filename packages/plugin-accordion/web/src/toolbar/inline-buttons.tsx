import { BUTTONS, getModalStyles } from 'wix-rich-content-editor-common';
import { Modals } from '../modals';
import { TABS } from '../defaults';
import { CreateInlineButtons } from 'wix-rich-content-common';

const createInlineButtons: CreateInlineButtons<'t' | 'isMobile' | 'settings'> = ({
  t,
  isMobile,
  // settings = {},
}) => {
  return [
    {
      keyName: 'settings',
      type: BUTTONS.EXTERNAL_MODAL,
      modalName: Modals.ACCORDION_MODAL,
      children: t('Accordion_AccordionSettings_Tab_Settings_TabName'),
      modalStyles: getModalStyles({ isMobile }),
      t,
      activeTab: TABS.SETTINGS,
      mobile: true,
      // settings,
    },
    {
      keyName: 'design',
      type: BUTTONS.EXTERNAL_MODAL,
      modalName: Modals.ACCORDION_MODAL,
      children: t('Accordion_AccordionSettings_Tab_Design_TabName'),
      modalStyles: getModalStyles({ isMobile }),
      t,
      activeTab: TABS.DESIGN,
      mobile: true,
    },
    { keyName: 'separator', mobile: false, type: BUTTONS.SEPARATOR },
    { keyName: 'delete', type: BUTTONS.DELETE, mobile: true },
    // settings,
  ];
};

export default createInlineButtons;
