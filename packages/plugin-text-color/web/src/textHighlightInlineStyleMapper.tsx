import React from 'react';
import { DEFAULT_STYLE_SELECTION_PREDICATE, DEFAULT_BACKGROUND_STYLE_FN } from './constants';
import { TEXT_HIGHLIGHT_TYPE, TextHighlightPluginViewerConfig } from './types';
import {
  textBackgroundPredicate,
  viewerStyleFnFilter,
  isTextHighlight,
} from './text-decorations-utils';
import { getBlocksFromContentState } from './innerRCEBlocksUtils';
import { InlineStyleMapperFunction, InlineStyleMapper } from 'wix-rich-content-common';

/**
 * textHighlightInlineStyleMapper
 * @param {object} config consumer plugin configuration
 * @param {object} raw raw content state
 * @returns {function} mapping of inline style => component
 */
export const textHighlightInlineStyleMapper: InlineStyleMapperFunction<TextHighlightPluginViewerConfig> = (
  config,
  raw = { blocks: [], entityMap: {} }
) => {
  const settings = config[TEXT_HIGHLIGHT_TYPE] || {};
  const styleSelectionPredicate = textBackgroundPredicate(
    settings.styleSelectionPredicate || DEFAULT_STYLE_SELECTION_PREDICATE
  );
  const customStyleFn =
    (settings.customStyleFn && viewerStyleFnFilter(settings.customStyleFn, isTextHighlight)) ||
    DEFAULT_BACKGROUND_STYLE_FN;
  const rawBlocks = getBlocksFromContentState(raw);
  const mapper = rawBlocks.reduce<InlineStyleMapper>((map, block) => {
    if (block.inlineStyleRanges) {
      block.inlineStyleRanges
        .filter(range => styleSelectionPredicate(range.style))
        .forEach(range => {
          map[range.style] = (children, { key }) => (
            <span key={key} style={customStyleFn(range.style)}>
              {children}
            </span>
          );
        });
    }

    return map;
  }, {});
  return () => mapper;
};
