import React from 'react';
import { AddIcon } from '../icons';
import PropTypes from 'prop-types';

const AddNewSection = ({ style, onClick }) => {
  return (
    //eslint-disable-next-line
    <div className={style} onClick={onClick}>
      <AddIcon />
    </div>
  );
};

AddNewSection.propTypes = {
  style: PropTypes.any.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default AddNewSection;
