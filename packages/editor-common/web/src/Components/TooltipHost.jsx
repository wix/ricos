import React from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';
import { mergeStyles } from 'wix-rich-content-common';
import styles from '../../statics/styles/tooltip.scss';

const PLACE_BUTTON = 'place-bottom';

// TODO: add tooltip configuration ability
const TooltipHost = ({ theme }) => {
  const mergedStyles = mergeStyles({ styles, theme });
  return (
    <ReactTooltip
      className={mergedStyles.tooltip}
      effect={'solid'}
      delayShow={300}
      multiline
      overridePosition={({ left, top: originalTop }, currentEvent, currentTarget, node) => {
        const isBottomTooltip = node?.className && node.className.indexOf(PLACE_BUTTON) > -1;
        const top = originalTop - (isBottomTooltip ? 30 : 0);
        return { top, left };
      }}
    />
  );
};

TooltipHost.propTypes = {
  theme: PropTypes.object.isRequired,
};

export default TooltipHost;
