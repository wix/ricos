import React from 'react';
import PropTypes from 'prop-types';
import styles from '../../statics/styles/borders.scss';

const CellBorders = ({ borders }) => [
  borders.top && <div key="top" style={{ background: borders.top }} className={styles.borderT} />,
  borders.bottom && (
    <div key="bottom" style={{ background: borders.bottom }} className={styles.borderB} />
  ),
  borders.right && (
    <div key="right" style={{ background: borders.right }} className={styles.borderR} />
  ),
  borders.left && (
    <div key="left" style={{ background: borders.left }} className={styles.borderL} />
  ),
];

CellBorders.propTypes = {
  borders: PropTypes.object,
};

export default CellBorders;
