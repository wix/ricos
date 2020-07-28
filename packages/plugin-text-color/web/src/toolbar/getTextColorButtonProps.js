import React from 'react';
import {
  BUTTON_TYPES,
  getModalStyles,
  getSelectionStyles,
  EditorState,
  isAtomicBlockFocused,
} from 'wix-rich-content-editor-common';
import TextColorPanel from './TextColorPanel';
import { TEXT_COLOR_TYPE, TEXT_HIGHLIGHT_TYPE } from '../types';
import {
  styleMapper,
  textForegroundPredicate,
  textBackgroundPredicate,
} from '../text-decorations-utils';
import TextColorIcon from './TextColorIcon';
import TextHighlightIcon from './TextHighlightIcon';
import {
  DEFAULT_STYLE_SELECTION_PREDICATE,
  DEFAULT_COLOR,
  DEFAULT_HIGHLIGHT_COLOR,
} from '../constants';

const pluginSettingsByType = {
  [TEXT_COLOR_TYPE]: {
    defaultColor: DEFAULT_COLOR,
    icon: TextColorIcon,
    predicate: textForegroundPredicate,
    tooltipKey: 'TextColorButton_Tooltip',
  },
  [TEXT_HIGHLIGHT_TYPE]: {
    defaultColor: DEFAULT_HIGHLIGHT_COLOR,
    icon: TextHighlightIcon,
    predicate: textBackgroundPredicate,
    tooltipKey: 'TextHighlightButton_Tooltip',
  },
};

export const getButtonProps = ({ config, type }) => {
  const {
    getEditorState,
    setEditorState,
    t,
    theme,
    isMobile,
    helpers,
    uiSettings,
    [type]: settings,
  } = config;

  const pluginSettings = pluginSettingsByType[type];

  const styleMap = styleMapper(type);

  const closePanel = newEditorState => {
    const editorState = getEditorState();
    const selection = editorState.getSelection();
    setEditorState(EditorState.forceSelection(newEditorState || editorState, selection));
    helpers?.closeModal?.();
  };

  const noop = () => false;

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

  const TextColorModal = () => {
    return (
      <TextColorPanel
        t={t}
        isMobile={isMobile}
        theme={theme}
        closeModal={closePanel}
        editorState={getEditorState()}
        setEditorState={setEditorState}
        settings={settings}
        uiSettings={uiSettings}
        styleMapper={styleMap}
        predicate={pluginSettings.predicate}
        defaultColor={pluginSettings.defaultColor}
        setKeepToolbarOpen={noop}
      />
    );
  };

  const openTextColorModal = ref => {
    const modalStyles = getModalStyles({
      customStyles: modalStylesFn(ref),
      fullScreen: false,
      isMobile,
    });
    helpers?.openModal?.({
      modalStyles,
      helpers,
      isMobile,
      modalElement: TextColorModal,
      theme,
    });
  };

  return {
    onClose: () => {},
    onClick: ref => openTextColorModal(ref),
    isDisabled: () =>
      getEditorState()
        .getSelection()
        .isCollapsed() || isAtomicBlockFocused(getEditorState()),
    arrow: false,
    isActive: () => {
      const predicate = pluginSettings.predicate(
        settings?.styleSelectionPredicate || DEFAULT_STYLE_SELECTION_PREDICATE
      );
      return getSelectionStyles(predicate, config.getEditorState()).length > 0;
    },
    getIcon: () => settings?.toolbar?.icons?.InsertPluginButtonIcon || pluginSettings.icon,
    tooltip: config.t(pluginSettings.tooltipKey),
    getLabel: () => '',
    type: BUTTON_TYPES.DROPDOWN,
    dataHook: '', // TODO: set datahook
  };
};
