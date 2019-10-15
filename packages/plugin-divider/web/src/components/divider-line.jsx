import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Context } from 'wix-rich-content-common';

import { LINE_DOUBLE } from '../constants';

const getLines = (type, width, multilineDinstance = 7) => {
  switch (type) {
    case LINE_DOUBLE:
      return [
        { x2: width, y1: 1, y2: 1 },
        {
          x2: width,
          y1: multilineDinstance,
          y2: multilineDinstance,
        },
      ];
    default:
      return [{ x2: width, y1: 1, y2: 1 }];
  }
};

const DividerLine = ({
  type,
  size,
  alignment,
  width,
  multilineDinstance,
  styles,
  className,
  contextType,
  fillParent,
}) => {
  const lines = getLines(type, width, multilineDinstance);
  const { Consumer } = contextType || Context;
  return (
    <Consumer>
      {context => {
        const lineClassName = classNames(
          styles.divider,
          styles[`divider--${type}`],
          styles[`divider--${size}${context.isMobile ? '--mobile' : ''}`],
          styles[`divider--${alignment}`],
          fillParent ? styles['divider--fill-parent'] : '',
          className
        );
        return (
          <svg className={lineClassName}>
            {lines.map((props, i) => (
              <line key={i} {...props} />
            ))}
          </svg>
        );
      }}
    </Consumer>
  );
};

DividerLine.propTypes = {
  type: PropTypes.string.isRequired,
  size: PropTypes.string,
  alignment: PropTypes.string,
  styles: PropTypes.object.isRequired,
  className: PropTypes.string,
  width: PropTypes.number.isRequired,
  multilineDinstance: PropTypes.number,
  contextType: PropTypes.object,
  fillParent: PropTypes.bool,
};

export default DividerLine;
