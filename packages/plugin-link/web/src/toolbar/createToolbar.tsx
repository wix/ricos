import React from 'react';
import {
  MODIFIERS,
  hasLinksInSelection,
  removeLinksInSelection,
  EditorModals,
  getModalStyles,
  insertLinkAtCurrentSelection,
} from 'wix-rich-content-editor-common';
import createInlineButtons from './inline-buttons';
import TextLinkButton from './TextLinkButton';
import { CreatePluginToolbar } from 'wix-rich-content-common';

const openLinkModal = ({
  helpers,
  isMobile,
  anchorTarget,
  relValue,
  t,
  theme,
  getEditorState,
  setEditorState,
  uiSettings,
  closeInlinePluginToolbar,
}) => {
  const modalStyles = getModalStyles({ fullScreen: false, isMobile });
  if (helpers && helpers.openModal) {
    const modalProps = {
      helpers,
      modalStyles,
      isMobile,
      getEditorState,
      setEditorState,
      t,
      theme,
      anchorTarget,
      relValue,
      modalName: EditorModals.TEXT_LINK_MODAL,
      hidePopup: helpers.closeModal,
      uiSettings,
      insertLinkFn: insertLinkAtCurrentSelection,
      closeInlinePluginToolbar,
    };
    helpers.openModal(modalProps);
  } else {
    //eslint-disable-next-line no-console
    console.error(
      'Link plugin: failed to display Link modal dialog since helpers.openModal is not defined'
    );
  }
};

const createToolbar: CreatePluginToolbar = config => ({
  TextButtonMapper: () => ({
    Link: {
      component: props => (
        <TextLinkButton
          insertLinkFn={insertLinkAtCurrentSelection}
          isActive={hasLinksInSelection(config.getEditorState())}
          closeInlinePluginToolbar={config.closeInlinePluginToolbar}
          tooltipText={config.t('TextLinkButton_Tooltip')}
          innerModal={config.innerModal}
          {...props}
        />
      ),
      isMobile: true,
      position: { mobile: 4.1 },
      group: { mobile: 1 },
      keyBindings: [
        {
          keyCommand: {
            command: 'link',
            modifiers: [MODIFIERS.COMMAND],
            key: 'k',
          },
          commandHandler: editorState => {
            if (hasLinksInSelection(editorState)) {
              config.closeInlinePluginToolbar();
              return removeLinksInSelection(editorState);
            } else {
              openLinkModal(config);
            }
          },
        },
      ],
    },
  }),
  InlinePluginToolbarButtons: createInlineButtons(config),
  name: 'link',
});

export default createToolbar;
