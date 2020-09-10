import React from 'react';
import { AddIcon } from '../icons';
import PropTypes from 'prop-types';

const AddNewSection = ({ className, onClick, style }) => {
  return (
    //eslint-disable-next-line
    <div className={className} onClick={onClick} style={style}>
      <div />
      <AddIcon />
    </div>
  );
};

AddNewSection.propTypes = {
  style: PropTypes.object,
  className: PropTypes.any.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default AddNewSection;
