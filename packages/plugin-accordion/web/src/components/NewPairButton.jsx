import React from 'react';
import PropTypes from 'prop-types';
import { Icons } from '../defaults';
import styles from '../../statics/styles/new-pair-button.rtlignore.scss';

const dataHook = 'AccordionNewPair_button';

export default function NewPairButton(props) {
  return (
    <button className={styles.new_pair_container} onClick={props.onClick} data-hook={dataHook}>
      <div className={styles.new_pair_button}>
        <Icons.plus />
        <label className={styles.new_pair_label}>{props.placeholder}</label>
      </div>
    </button>
  );
}

NewPairButton.propTypes = {
  placeholder: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
