import React, { FunctionComponent, ComponentType } from 'react';

import { EditorModals } from 'wix-rich-content-editor-common';
import { RichContentModal } from 'wix-rich-content-ui-components';
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
  modalName,
  modalElement,
  modalsMap,
  ...modalProps
}) => {
  const ModalsMap = { ...Modals, ...modalsMap };
  const element = ModalsMap[modalName || ''] || modalElement;
  if (!element) {
    (modalName || modalElement) &&
      console.error(`Attempted to open unknown external modal '${modalName}'`); //eslint-disable-line no-console
    return null;
  }
  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      onMouseDown={e => e.nativeEvent.stopImmediatePropagation()}
      data-id="rich-content-editor-modal"
    >
      <RichContentModal modalElement={element} {...modalProps} />
    </div>
  );
};

export default RichContentEditorModal;
