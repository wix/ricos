//@flow
import { MODIFIERS, hasLinksInSelection, removeLinksInSelection, EditorModals, getModalStyles } from 'wix-rich-content-common';
import TextLinkButton from './TextLinkButton';

const openLinkModal = (helpers, isMobile, anchorTarget, relValue, t, theme, getEditorState, setEditorState) => {
  const modalStyles = getModalStyles({ fullScreen: false });
  if (helpers && helpers.openModal) {
    const modalProps = { helpers, modalStyles, isMobile, getEditorState, setEditorState, t, theme, anchorTarget,
      relValue, modalName: EditorModals.MOBILE_TEXT_LINK_MODAL, hidePopup: helpers.closeModal };
    helpers.openModal(modalProps);
  }
};

export const linkTextButtonMapper /*: TextButtonMapper */ =
  ({ helpers, isMobile, anchorTarget, relValue, t, theme, getEditorState, setEditorState }) => ({
    TextButtonMapper: () => ({
      Link: {
        component: TextLinkButton,
        isMobile: true,
        position: { mobile: 5 },
        keyBindings: [{
          keyCommand: {
            command: 'link',
            modifiers: [MODIFIERS.COMMAND],
            key: 'k'
          },
          commandHandler: editorState => {
            if (hasLinksInSelection(editorState)) {
              return removeLinksInSelection(editorState);
            } else {
              openLinkModal(helpers, isMobile, anchorTarget, relValue, t, theme, getEditorState, setEditorState);
            }
          }
        }]
      }
    })
  });
