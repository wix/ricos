import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { LINE_DOUBLE } from '../defaults';

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
  fillParent,
  isMobile,
}) => {
  const linesPropsArr = getLines(type, width, multilineDistance);
  const lineClassName = classNames(
    styles.divider,
    styles[`divider--${type}`],
    styles[`divider--${size}${isMobile ? '--mobile' : ''}`],
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
};

DividerLine.propTypes = {
  type: PropTypes.string.isRequired,
  size: PropTypes.string,
  alignment: PropTypes.string,
  styles: PropTypes.object.isRequired,
  className: PropTypes.string,
  width: [PropTypes.number, PropTypes.string].isRequired,
  multilineDistance: PropTypes.number,
  fillParent: PropTypes.bool,
  isMobile: PropTypes.bool,
};

export default DividerLine;
