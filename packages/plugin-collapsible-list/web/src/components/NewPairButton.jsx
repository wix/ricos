import React from 'react';
import PropTypes from 'prop-types';
import { PlusIcon } from '../icons';
import styles from '../../statics/styles/new-pair-button.rtlignore.scss';

const dataHook = 'CollapsibleListNewPair_button';

export default function NewPairButton(props) {
  const onKeyPress = e => (e.key === 'Enter' || e.key === ' ') && props.onClick(e);

  return (
    //using 'div' element instead of 'button' to fix a bug of focus on element in Firefox in OSX
    // further reading, https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#Clicking_and_focus#Clicking_and_focus
    <div
      role="button"
      tabIndex="0"
      className={styles.new_pair_container}
      onClick={props.onClick}
      onKeyPress={onKeyPress}
      data-hook={dataHook}
    >
      <div className={styles.new_pair_button}>
        <PlusIcon />
        <label className={styles.new_pair_label}>{props.label}</label>
      </div>
    </div>
  );
}

NewPairButton.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
