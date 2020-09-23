import React from 'react';
import styles from '../../statics/styles/giphy-selecter.scss';
import PropTypes from 'prop-types';

const GiphyEmptyState = ({ t }) => (
  <div className={styles.giphy_empty_state}>
    <div>{t('GiphyPlugin_Search_EmptyState_Title')}</div>
    <div>{t('GiphyPlugin_Search_EmptyState_Text')}</div>
  </div>
);

GiphyEmptyState.propTypes = {
  t: PropTypes.func,
};

export default GiphyEmptyState;
