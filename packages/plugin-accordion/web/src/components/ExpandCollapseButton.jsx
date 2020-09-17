import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { ArrowIcon } from '../icons';
import styles from '../../statics/styles/accordion-component.rtlignore.scss';

export default function ExpandCollapseButton(props) {
  const { onClick } = props;

  return (
    <button className={styles.iconContainer} onClick={onClick}>
      <ArrowIcon className={classNames(styles.icon, props.isExpanded && styles.isExpanded)} />
    </button>
  );
}

ExpandCollapseButton.propTypes = {
  isExpanded: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};
