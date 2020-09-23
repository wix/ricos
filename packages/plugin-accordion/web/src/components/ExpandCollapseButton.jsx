import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { ArrowIcon } from '../icons';
import styles from '../../statics/styles/accordion-pair.rtlignore.scss';

export default function ExpandCollapseButton(props) {
  const { className, onClick, idx } = props;

  return (
    <button
      className={classNames(styles.iconContainer, className)}
      onClick={onClick}
      data-hook={`ExpandCollapseButton_${idx}`}
    >
      <ArrowIcon className={classNames(styles.icon, props.isExpanded && styles.isExpanded)} />
    </button>
  );
}

ExpandCollapseButton.propTypes = {
  className: PropTypes.string,
  isExpanded: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  idx: PropTypes.string,
};
