import React from 'react';
import PropTypes from 'prop-types';
import { Icons } from '../defaults';
import styles from '../../statics/styles/dnd-handle.rtlignore.scss';

export default function DndHandle(props) {
  return (
    <div className={styles.dndIcon} {...props.dragHandleProps}>
      <Icons.dnd />
    </div>
  );
}

DndHandle.propTypes = {
  dragHandleProps: PropTypes.object.isRequired,
};
