import React from 'react';
import styles from '../statics/styles/adsense.scss';
import PropTypes from 'prop-types';
import { InfoIcon } from 'wix-rich-content-editor-common';

const AdsenseTitle = ({ t }) => {
  return (
    <div className={styles.container}>
      {t('HtmlEditPanel_HtmlInput_AdSense_Title')}
      <div className={styles.tooltip}>
        <InfoIcon tooltipText={t('HtmlEditPanel_HtmlInput_AdSense_Tooltip')} />
      </div>
    </div>
  );
};

AdsenseTitle.propTypes = {
  t: PropTypes.func,
};

export default AdsenseTitle;
