import { BUTTONS } from 'wix-rich-content-editor-common';

const createInlineButtons: CreateInlineButtons = () => {
  return [{ keyName: 'delete', type: BUTTONS.DELETE, mobile: true }];
};

export default createInlineButtons;
