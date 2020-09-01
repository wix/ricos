import React from 'react';
import {
  MODIFIERS,
  hasLinksInSelection,
  removeLinksInSelection,
  EditorModals,
  getModalStyles,
  insertLinkAtCurrentSelection,
  LinkIcon,
  BUTTON_TYPES,
  FORMATTING_BUTTONS,
  isAtomicBlockFocused,
} from 'wix-rich-content-plugin-commons';
import createInlineButtons from './inline-buttons';
import TextLinkButton from './TextLinkButton';
import { CreatePluginToolbar } from 'wix-rich-content-common';
import { LINK_TYPE } from '../types';

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
  LINK,
}) => {
  const modalStyles = getModalStyles({
    fullScreen: false,
    isMobile,
    customStyles: { content: { maxWidth: 'max-content', padding: '1px 20px' } },
  });
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
      linkTypes: LINK?.linkTypes,
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
    [FORMATTING_BUTTONS.LINK]: {
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
      externalizedButtonProps: {
        onClick: e => {
          e.preventDefault();
          openLinkModal(config);
        },
        isActive: () => hasLinksInSelection(config.getEditorState()),
        isDisabled: () => isAtomicBlockFocused(config.getEditorState()),
        getIcon: () => config[LINK_TYPE]?.toolbar?.icons?.InsertPluginButtonIcon || LinkIcon,
        tooltip: config.t('TextLinkButton_Tooltip'),
        getLabel: () => '', // new key needed?
        type: BUTTON_TYPES.BUTTON,
      },
    },
  }),
  InlinePluginToolbarButtons: createInlineButtons(config),
  name: 'link',
});

export default createToolbar;
