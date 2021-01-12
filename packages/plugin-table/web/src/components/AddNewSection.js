import React from 'react';
import { AddIcon } from '../icons';
import PropTypes from 'prop-types';
import styles from '../../statics/styles/add-new-section.scss';

const AddNewSection = ({ onClick, dataHook }) => {
  return (
    //eslint-disable-next-line
    <div data-hook={dataHook} onClick={onClick} className={styles.container}>
      <AddIcon />
    </div>
  );
};

AddNewSection.propTypes = {
  onClick: PropTypes.func.isRequired,
  dataHook: PropTypes.string,
};

export default AddNewSection;
