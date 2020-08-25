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
    if (!ref?.getBoundingClientRect) {
      return {};
    }
    const { bottom, left } = ref.getBoundingClientRect();
    return isMobile
      ? {
          content: {
            position: 'absolute',
            left: '0px',
            right: '0px',
            bottom: '0',
            border: 'none',
            background: 'white',
            overflow: 'auto',
            outline: 'none',
            padding: '0px',
            width: '100%',
            zIndex: '6',
            top: 'auto',
            transform: 'translateY(0)',
            margin: 0,
          },
        }
      : {
          content: {
            display: 'inline-table',
            transform: 'translateY(0)',
            minHeight: '116px',
            height: 'auto',
            position: 'absolute',
            minWidth: '216px',
            maxWidth: '360px',
            width: 'auto',
            top: bottom,
            left: left - 15,
            borderRadius: '6px',
            border: '1px solid #ededed',
            margin: '0',
            background: '#fff',
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

  // if render exists, calls it with modal element
  // otherwise, if ref exists, uses it to render the popup under the button
  // otherwise, renders modal in the center
  const openTextColorModal = ({ ref, render }) => {
    if (render) {
      render(TextColorModal);
    } else {
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
    }
  };

  return {
    onClose: () => {},
    onClick: ({ ref, render }) => openTextColorModal({ ref, render }),
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
