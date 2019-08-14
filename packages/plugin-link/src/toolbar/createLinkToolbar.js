import {
  MODIFIERS,
  hasLinksInSelection,
  removeLinksInSelection,
  EditorModals,
  getModalStyles,
} from 'wix-rich-content-common';
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
      component: TextLinkButton,
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
});
