import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { ArrowIcon } from '../icons';
import styles from '../../statics/styles/accordion-component.rtlignore.scss';

export default function ExpandCollapseButton(props) {
  const { onClick, idx, ariaLabel } = props;

  return (
    //using 'div' element instead of 'button' to fix a bug of focus on element in Firefox in OSX
    // further reading, https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#Clicking_and_focus#Clicking_and_focus
    <div
      role="button"
      tabIndex="-1"
      className={styles.iconContainer}
      onClick={onClick}
      onKeyUp={e => (e.key === ' ' || e.key === 'Enter') && onClick(e)}
      data-hook={`ExpandCollapseButton_${idx}`}
    >
      <ArrowIcon
        role="button"
        tabIndex="0"
        aria-label={ariaLabel}
        className={classNames(styles.icon, props.isExpanded && styles.isExpanded)}
      />
    </div>
  );
}

ExpandCollapseButton.propTypes = {
  isExpanded: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  idx: PropTypes.string,
  ariaLabel: PropTypes.string,
};
