import React from 'react';
import PropTypes from 'prop-types';
import { DndIcon } from '../icons';
import styles from '../../statics/styles/dnd-handle.rtlignore.scss';

export default function DndHandle(props) {
  return (
    <div className={styles.dndIcon} {...props.dragHandleProps}>
      <DndIcon />
    </div>
  );
}

DndHandle.propTypes = {
  dragHandleProps: PropTypes.object.isRequired,
};
