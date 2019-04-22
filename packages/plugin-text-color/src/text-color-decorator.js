import React from 'react';
import PropTypes from 'prop-types';
import { isHexColor } from 'wix-rich-content-common';

const colors = {};

const TextColorComponent = props => (
  <span style={{ color: colors[props.key] }}>{props.decoratedText}</span>
);
TextColorComponent.propTypes = {
  decoratedText: PropTypes.string,
  key: PropTypes.string,
};
export default {
  component: TextColorComponent,
  strategy: (contentBlock, callback) => {
    if (contentBlock && contentBlock.inlineStyleRanges) {
      contentBlock.inlineStyleRanges
        .filter(range => {
          if (isHexColor(range.style)) {
            colors[`${contentBlock.key}.${range.offset}.0`] = range.style;
            return true;
          }
          return false;
        })
        .forEach(({ offset, length }) => callback(offset, offset + length));
    }
  },
};
