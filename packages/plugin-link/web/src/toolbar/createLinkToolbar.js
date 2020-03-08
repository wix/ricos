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
      modalName: EditorModals.MOBILE_TEXT_LINK_MODAL,
      hidePopup: helpers.closeModal,
      uiSettings,
    };
    helpers.openModal(modalProps);
  } else {
    //eslint-disable-next-line no-console
    console.error(
      'Link plugin: failed to display Link modal dialog since helpers.openModal is not defined'
    );
  }
};

export default config => ({
  TextButtonMapper: () => ({
    Link: {
      component: props => (
        <TextLinkButton
          insertLinkFn={insertLinkAtCurrentSelection}
          isActive={hasLinksInSelection(config.getEditorState())}
          commonPubsub={config.commonPubsub}
          {...props}
        />
      ),
      isMobile: true,
      position: { mobile: 5 },
      keyBindings: [
        {
          keyCommand: {
            command: 'link',
            modifiers: [MODIFIERS.COMMAND],
            key: 'k',
          },
          commandHandler: editorState => {
            if (hasLinksInSelection(editorState)) {
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
