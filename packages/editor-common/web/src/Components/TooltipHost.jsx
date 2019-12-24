import React from 'react';
import ReactTooltip from 'react-tooltip';
import { mergeStyles, Context } from 'wix-rich-content-common';
import styles from '../../statics/styles/tooltip.scss';

// TODO: add tooltip configuration ability
const TooltipHost = () => {
  return (
    <Context.Consumer>
      {context => {
        const { theme } = context;
        const mergedStyles = mergeStyles({ styles, theme });
        return (
          <ReactTooltip
            className={mergedStyles.tooltip}
            effect={'solid'}
            delayShow={300}
            // eslint-disable-next-line react/jsx-boolean-value
            multiline={true}
          />
        );
      }}
    </Context.Consumer>
  );
};

export default TooltipHost;
