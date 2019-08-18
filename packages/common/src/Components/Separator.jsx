import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Styles from '../../statics/styles/toolbar-separator.scss';

const Separator = ({ className = '', horizontal = false }) => {
  const separatorClassNames = clsx(
    horizontal ? Styles.horizontalSeparator : Styles.separator,
    className
  );
  return (
    <div
      className={separatorClassNames}
      role="separator"
      aria-orientation={horizontal ? 'horizontal' : 'vertical'}
    />
  );
};

Separator.propTypes = {
  className: PropTypes.string,
  horizontal: PropTypes.bool,
};

export default Separator;
