import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { PlusIcon } from '../icons';
import styles from '../../statics/styles/new-pair-button.rtlignore.scss';

const dataHook = 'AccordionNewPair_button';

export default function NewPairButton(props) {
  return (
    <button
      className={classNames(styles.new_pair_container, props.className)}
      onClick={props.onClick}
      data-hook={dataHook}
    >
      <div className={styles.new_pair_button}>
        <PlusIcon />
        <label className={styles.new_pair_label}>{props.label}</label>
      </div>
    </button>
  );
}

NewPairButton.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
