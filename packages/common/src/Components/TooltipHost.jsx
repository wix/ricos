import React from 'react';
import ReactTooltip from 'react-tooltip';
import Context from '../Utils/Context';
import { mergeStyles } from '../Utils/mergeStyles';
import styles from '../../statics/styles/tooltip.scss';

// TODO: add tooltip configuration ability
const TooltipHost = () => {
  return (
    <Context.Consumer>
      {context => {
        const { theme } = context;
        const mergedStyles = mergeStyles({ styles, theme });
        return <ReactTooltip className={mergedStyles.tooltip} effect={'solid'} delayShow={300} />;
      }}
    </Context.Consumer>
  );
};

export default TooltipHost;
