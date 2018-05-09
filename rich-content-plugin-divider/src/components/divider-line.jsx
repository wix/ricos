import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { LINE_SINGLE, LINE_DOUBLE, LINE_DASHED, LINE_DOTTED } from '../constants';

const DEFAULT_LINE_PROPS = { x1: 1, y1: 1, x2: 740, y2: 1, stroke: 'currentColor' };

const linePropsMap = {
  [LINE_SINGLE]: [DEFAULT_LINE_PROPS],
  [LINE_DOUBLE]: [DEFAULT_LINE_PROPS, { ...DEFAULT_LINE_PROPS, y1: 5, y2: 5 }],
  [LINE_DASHED]: [{ ...DEFAULT_LINE_PROPS, strokeDasharray: '4, 4' }],
  [LINE_DOTTED]: [{ ...DEFAULT_LINE_PROPS, strokeDasharray: '1, 5' }]
};

const DividerLine = ({ type, size, alignment, styles, isMobile, className }) => {
  const lineProps = linePropsMap[type];
  const lineClassName = classNames(
    styles.divider__line,
    styles[`divider__line--${size}${isMobile ? '--mobile' : ''}`],
    styles[`divider__line--${alignment}`],
    className
  );
  return (
    <svg className={lineClassName}>
      {lineProps.map((props, i) => <line key={i} {...props} />)}
    </svg>
  );
};

DividerLine.propTypes = {
  type: PropTypes.string.isRequired,
  size: PropTypes.string,
  alignment: PropTypes.string,
  styles: PropTypes.object.isRequired,
  className: PropTypes.string,
  isMobile: PropTypes.bool,
};

export default DividerLine;
