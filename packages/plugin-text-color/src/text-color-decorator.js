import React from 'react';
import { DEFAULT_STYLE_SELECTION_PREDICATE, DEFAULT_STYLE_FN } from './constants';
import { TEXT_COLOR_TYPE } from './types';

const colors = {};

const getTextColorComponent = customStyleFn => props => (
  <span style={customStyleFn(colors[props.key])}>{props.decoratedText}</span> // eslint-disable-line react/prop-types
);

export default config => {
  const settings = config[TEXT_COLOR_TYPE] || {};
  const styleSelectionPredicate =
    settings.styleSelectionPredicate || DEFAULT_STYLE_SELECTION_PREDICATE;
  const customStyleFn = settings.customStyleFn || DEFAULT_STYLE_FN;
  return {
    component: getTextColorComponent(customStyleFn),
    strategy: (contentBlock, callback) => {
      if (contentBlock && contentBlock.inlineStyleRanges) {
        contentBlock.inlineStyleRanges
          .filter(range => {
            if (styleSelectionPredicate(range.style)) {
              colors[`${contentBlock.key}.${range.offset}.0`] = range.style;
              return true;
            }
            return false;
          })
          .forEach(({ offset, length }) => callback(offset, offset + length));
      }
    },
  };
};
