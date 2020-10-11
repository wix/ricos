import React from 'react';
import { PlusIcon } from '../icons';
import PropTypes from 'prop-types';
import styles from '../../statics/styles/plus-circle.scss';
import classNames from 'classnames';

const PlusCircle = ({ highlightResizer, isCol, onClick, index }) => {
  const onMouseLeave = () => highlightResizer(false, isCol);
  const onMouseEnter = () => highlightResizer(index, isCol);

  return (
    //eslint-disable-next-line
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={classNames(styles.add, !isCol && styles.addRow)}
    >
      <div className={styles.icon}>
        <PlusIcon onClick={() => onClick(index + 1)} />
      </div>
    </div>
  );
};

PlusCircle.propTypes = {
  isCol: PropTypes.bool,
  highlightResizer: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
};

export default PlusCircle;
