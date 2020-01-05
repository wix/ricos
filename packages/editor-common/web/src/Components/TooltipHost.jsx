import React from 'react';
import ReactTooltip from 'react-tooltip';
import { mergeStyles, Context } from 'wix-rich-content-common';
import styles from '../../statics/styles/tooltip.scss';

const PLACE_BUTTON = 'place-bottom';

// TODO: add tooltip configuration ability
const TooltipHost = () => {
  return (
    <Context.Consumer>
      {context => {
        const { theme } = context;
        const mergedStyles = mergeStyles({ styles, theme });
        return (
          <ReactTooltip
            overridePosition={({ left, top: originalTop }, currentEvent, currentTarget, node) => {
              const isBottomTooltip = node?.className && node.className.indexOf(PLACE_BUTTON) > -1;
              const top = originalTop - (isBottomTooltip ? 30 : 0);
              return { top, left };
            }}
            className={mergedStyles.tooltip}
            effect={'solid'}
            delayShow={300}
          />
        );
      }}
    </Context.Consumer>
  );
};

export default TooltipHost;
