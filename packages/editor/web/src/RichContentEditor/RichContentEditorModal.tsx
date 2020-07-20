import React, { FunctionComponent, ComponentType } from 'react';

import { EditorModals, RichContentModal } from 'wix-rich-content-editor-common';
import MobileAddPluginModal from './Toolbars/SideToolbar/AddPluginMenu';
import BlockLinkModal from './Toolbars/BlockLinkModal';
import TextLinkModal from './Toolbars/TextLinkModal';

const Modals = {
  [EditorModals.MOBILE_ADD_PLUGIN]: MobileAddPluginModal,
  [EditorModals.BLOCK_LINK_MODAL]: BlockLinkModal,
  [EditorModals.TEXT_LINK_MODAL]: TextLinkModal,
};

interface Props {
  modalName?: string;
  modalElement?: ComponentType;
  modalsMap?: Record<string, ComponentType>;
  locale?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [propName: string]: any;
}

const RichContentEditorModal: FunctionComponent<Props> = ({
  modalName = '',
  modalElement,
  modalsMap,
  ...modalProps
}) => {
  const ModalsMap = { ...Modals, ...modalsMap };
  const element = ModalsMap[modalName] || modalElement;
  if (!element) {
    console.error(`Attempted to open unknown external modal '${modalName}'`); //eslint-disable-line no-console
    return null;
  }
  return <RichContentModal modalElement={element} {...modalProps} />;
};

export default RichContentEditorModal;
