import React from 'react';
import HeadingButton from './HeadingButton';
import {
  decorateComponentWithProps,
  EditorState,
  RichUtils,
  BUTTON_TYPES,
  getModalStyles,
} from 'wix-rich-content-editor-common';
import HeadingsDropDownPanel from './HeadingPanel';
import { DEFAULT_HEADERS_DROPDOWN_OPTIONS, HEADING_TYPE_TO_ELEMENT } from '../constants';

export default config => {
  const { theme, getEditorState, isMobile, settings, helpers, t, setEditorState } = config;

  const save = (type, element) => {
    helpers.closeModal();
    type
      ? updateHeading(type, element)
      : setEditorState(EditorState.forceSelection(oldEditorState, oldSelection));
  };

  const updateHeading = (type, element) => {
    const newEditorState = RichUtils.toggleBlockType(getEditorState(), type);
    setEditorState(EditorState.forceSelection(newEditorState, oldSelection));
    oldEditorState = newEditorState;
    currentHeading = element;
  };

  const getCurrentHeading = () => {
    const editorState = getEditorState();
    const selection = editorState.getSelection();
    const headingType = editorState
      .getCurrentContent()
      .blockMap.get(selection.focusKey)
      .getType();
    return HEADING_TYPE_TO_ELEMENT[headingType] || 'P';
  };

  const translateHeading = (option = 'P') => {
    return option === 'P'
      ? t('FormattingToolbar_TextStyle_Paragraph')
      : t('FormattingToolbar_TextStyle_Heading', { number: option.slice(-1) });
  };

  let currentHeading = 'P';
  let oldEditorState, oldSelection;

  const HeadingPanel = () => {
    oldEditorState = getEditorState();
    oldSelection = oldEditorState.getSelection();
    currentHeading = getCurrentHeading();
    return (
      <HeadingsDropDownPanel
        customHeadingsOptions={settings?.dropDownOptions || DEFAULT_HEADERS_DROPDOWN_OPTIONS}
        heading={currentHeading}
        onSave={save}
        isMobile={isMobile}
        theme={theme}
        translateHeading={translateHeading}
      />
    );
  };

  const modalStylesFn = ref => {
    const { bottom, left } = ref.getBoundingClientRect();
    return {
      content: {
        margin: 0,
        width: 142,
        overflow: 'visible',
        transform: 'translateY(0)',
        left: left - 15,
        top: bottom,
      },
      overlay: {
        background: 'transparent',
      },
    };
  };

  const openHeadingPanel = ref => {
    const modalStyles = getModalStyles({
      customStyles: modalStylesFn(ref),
      fullScreen: false,
      isMobile,
    });
    helpers?.openModal?.({
      modalStyles,
      helpers,
      isMobile,
      modalElement: HeadingPanel,
      theme,
    });
  };

  return {
    TextButtonMapper: () => ({
      Headings: {
        component: decorateComponentWithProps(HeadingButton, {
          helpers,
          t,
          settings,
          isMobile,
          customHeadings: settings?.dropDownOptions,
          icons: settings?.toolbar?.icons || {},
        }),
        externalizedButtonProps: {
          onClick: ref => openHeadingPanel(ref),
          isActive: () => false,
          isDisabled: () => false,
          getIcon: () => settings?.toolbar?.icons[getCurrentHeading()] || (() => null),
          tooltip: t('FormattingToolbar_TextStyleButton_Tooltip'),
          dataHook: 'headingsDropdownButton',
          getLabel: () => translateHeading(getCurrentHeading()),
          type: BUTTON_TYPES.DROPDOWN,
        },
      },
    }),
  };
};
