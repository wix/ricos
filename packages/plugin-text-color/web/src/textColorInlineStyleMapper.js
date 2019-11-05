import React from 'react';
import { DEFAULT_STYLE_SELECTION_PREDICATE, DEFAULT_FOREGROUND_STYLE_FN } from './constants';
import { TEXT_COLOR_TYPE } from './types';
import {
  textColorPredicateWrapper,
  viewerCustomStyleFnWrapper,
  isTextColor,
} from './text-decorations-utils';

/**
 * textColorInlineStyleMapper
 * @param {object} config consumer plugin configuration
 * @param {object} raw raw content state
 * @returns {function} mapping of inline style => component
 */
export default (config, raw = { blocks: [] }) => {
  const settings = config[TEXT_COLOR_TYPE] || {};
  const styleSelectionPredicate = textColorPredicateWrapper(
    settings.styleSelectionPredicate || DEFAULT_STYLE_SELECTION_PREDICATE
  );
  const customStyleFn =
    (settings.customStyleFn && viewerCustomStyleFnWrapper(settings.customStyleFn, isTextColor)) ||
    DEFAULT_FOREGROUND_STYLE_FN;
  const mapper = raw.blocks.reduce((map, block) => {
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
