import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Context } from 'wix-rich-content-common';
import { LINE_DOUBLE } from '../constants';

const lineProps = (width, lineDistance = 1) => ({
  x2: width,
  y1: lineDistance,
  y2: lineDistance,
});

const getLines = (type, width, multilineDistance = 7) => {
  const linePropsArr = [lineProps(width)];
  if (type === LINE_DOUBLE) {
    linePropsArr.push(lineProps(width, multilineDistance));
  }
  return linePropsArr;
};

const DividerLine = ({
  type,
  size,
  alignment,
  width,
  multilineDistance,
  styles,
  className,
  contextType,
  fillParent,
}) => {
  const linesPropsArr = getLines(type, width, multilineDistance);
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
            {linesPropsArr.map((lineProp, i) => (
              <line key={i} {...lineProp} />
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
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  multilineDistance: PropTypes.number,
  contextType: PropTypes.object,
  fillParent: PropTypes.bool,
};

export default DividerLine;
