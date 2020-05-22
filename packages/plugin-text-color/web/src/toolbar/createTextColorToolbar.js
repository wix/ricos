import React from 'react';
import { getSelectionStyles } from 'wix-rich-content-editor-common';
import TextColorButton from './TextColorButton';
import TextHighlightButton from './TextHighlightButton';
import TextColorPanel from './TextColorPanel';
import { TEXT_COLOR_TYPE, TEXT_HIGHLIGHT_TYPE } from '../types';
import { textForegroundPredicate, textBackgroundPredicate } from '../text-decorations-utils';
import TextColorIcon from './TextColorIcon';
import TextHighlightIcon from './TextHighlightIcon';
import { DEFAULT_STYLE_SELECTION_PREDICATE } from '../constants';

export const createTextColorToolbar = config => ({
  TextButtonMapper: () => ({
    TextColor: {
      component: TextColorButton,
      isMobile: true,
      position: { desktop: 2.1, mobile: 2.1 },
      group: { desktop: 1, mobile: 1 },
      externalizedButtonProps: {
        modalElement: props => <TextColorPanel {...props} {...config} />,
        isActive: () => {
          const predicate = textForegroundPredicate(
            config[TEXT_COLOR_TYPE]?.styleSelectionPredicate || DEFAULT_STYLE_SELECTION_PREDICATE
          );
          return getSelectionStyles(predicate, config.getEditorState()).length > 0;
        },
        getIcon: () =>
          config[TEXT_COLOR_TYPE]?.toolbar?.icons?.InsertPluginButtonIcon || TextColorIcon,
        tooltip: config.t('TextColorButton_Tooltip'),
        label: '',
        buttonType: 'modal',
      },
    },
  }),
});

export const createTextHighlightToolbar = config => ({
  TextButtonMapper: () => ({
    TextHighlight: {
      component: TextHighlightButton,
      isMobile: true,
      position: { desktop: 2.2, mobile: 2.2 },
      group: { desktop: 1, mobile: 1 },
      externalizedButtonProps: {
        modalElement: props => <TextColorPanel {...props} {...config} />,
        isActive: () => {
          const predicate = textBackgroundPredicate(
            config[TEXT_HIGHLIGHT_TYPE]?.styleSelectionPredicate ||
              DEFAULT_STYLE_SELECTION_PREDICATE
          );
          return getSelectionStyles(predicate, config.getEditorState()).length > 0;
        },
        getIcon: () =>
          config[TEXT_HIGHLIGHT_TYPE]?.toolbar?.icons?.InsertPluginButtonIcon || TextHighlightIcon,
        tooltip: config.t('TextHighlightButton_Tooltip'),
        label: '',
        buttonType: 'modal',
      },
    },
  }),
});
